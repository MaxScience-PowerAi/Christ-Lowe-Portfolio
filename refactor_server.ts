import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf-8');

// 1. Add imports
content = content.replace(
    `import cors from "cors";
import dotenv from "dotenv";`,
    `import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { GoogleGenAI, Type } from "@google/genai";
import crypto from "crypto";`
);

// 2. Add contacts table
content = content.replace(
    `  CREATE TABLE IF NOT EXISTS applications (`,
    `  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (`
);

// 3. Add active sessions & express setup
content = content.replace(
    `  const app = express();
  const PORT = Number(process.env.PORT || 3000);`,
    `  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  const activeSessions = new Set<string>();
  
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: false, // disabled for rapid dev
  }));
  
  // Rate limiting
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: "Too many requests" }
  }));`
);

// 4. Update CORS
content = content.replace(
    `  // Restrictive CORS configuration (explicit allowlist)
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS blocked for origin"));
    },`,
    `  const isProd = process.env.NODE_ENV === "production";
  app.use(cors({
    origin: (origin, callback) => {
      if ((!isProd && !origin) || (origin && allowedOrigins.includes(origin))) {
        callback(null, true);
        return;
      }
      callback(new Error("CORS blocked for origin"));
    },`
);

// 5. checkPassword modification to check cookie
content = content.replace(
    `  const checkPassword = (req: express.Request) => {
    const headerPassword = (req.headers["x-founders-password"] as string)?.trim().toLowerCase();
    const bodyPassword = req.body?.password?.trim().toLowerCase();

    const provided = bodyPassword || headerPassword;
    if (!provided) return false;

    return founderPasswords.includes(provided);
  };`,
    `  const checkAuth = (req: express.Request) => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return false;
    const match = cookieHeader.match(/powerai_session=([^;]+)/);
    if (!match) return false;
    const token = match[1];
    return activeSessions.has(token);
  };`
);

// 6. Fix usage of checkPassword in /api/applications/:id
content = content.replace(
    `  app.patch("/api/applications/:id", (req, res) => {
    if (!checkPassword(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }`,
    `  app.patch("/api/applications/:id", (req, res) => {
    if (!checkAuth(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }`
);

content = content.replace(
    `  app.get("/api/applications", (req, res) => {
    if (!checkPassword(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }`,
    `  app.get("/api/applications", (req, res) => {
    if (!checkAuth(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }`
);

// 7. Fix login logic
content = content.replace(
    `  app.post("/api/founders/login", (req, res) => {
    if (checkPassword(req)) {
      try {
        const applications = db.prepare("SELECT * FROM applications ORDER BY submitted_at DESC").all();
        res.json({ success: true, applications });
      } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Failed to fetch applications" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });`,
    `  app.post("/api/founders/login", (req, res) => {
    const bodyPassword = req.body?.password?.trim().toLowerCase();
    
    if (founderPasswords.includes(bodyPassword)) {
      try {
        const token = crypto.randomBytes(32).toString('hex');
        activeSessions.add(token);
        res.cookie('powerai_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: 'strict',
          maxAge: 8 * 60 * 60 * 1000 // 8 hours
        });
        
        const applications = db.prepare("SELECT * FROM applications ORDER BY submitted_at DESC").all();
        res.json({ success: true, applications });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications" });
      }
    } else {
      // Check if already authenticated via cookie
      if (checkAuth(req)) {
         const applications = db.prepare("SELECT * FROM applications ORDER BY submitted_at DESC").all();
         return res.json({ success: true, applications });
      }
      res.status(401).json({ error: "Unauthorized" });
    }
  });
  
  app.post("/api/founders/logout", (req, res) => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      const match = cookieHeader.match(/powerai_session=([^;]+)/);
      if (match) activeSessions.delete(match[1]);
    }
    res.clearCookie('powerai_session');
    res.json({ success: true });
  });`
);

// 8. Add AI and Contact routes
content = content.replace(
    `  // Vite middleware for development`,
    `  app.post("/api/ai/generate", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "API key missing in environment" });
      
      const { prompt, asJson } = req.body;
      const ai = new GoogleGenAI({ apiKey });
      
      const config: any = {};
      if (asJson) {
        config.responseMimeType = "application/json";
        config.responseSchema = {
            type: Type.OBJECT,
            properties: {
                isValid: { type: Type.BOOLEAN },
                feedback: { type: Type.STRING }
            },
            required: ["isValid", "feedback"]
        };
      }
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to generate AI content" });
    }
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "Missing required fields" });
    try {
      db.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)").run(
        normalizeText(name, 120),
        normalizeText(email, 200),
        normalizeText(message, 10000)
      );
      res.json({ success: true });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  // Vite middleware for development`
);

fs.writeFileSync('server.ts', content);
console.log("server.ts refactored successfully.");
