import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv"
import process from "process";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend email OK !");
});

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;;
const senderEmail = process.env.SENDER_EMAIL;

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email } = req.body;

  if (!nom || !prenom || !email) {
    return res.status(400).json({ success: false, message: "Nom, prénom et email requis." });
  }

  console.log("Reçu du frontend :", req.body);

  try {
    const result = await apiInstance.sendTransacEmail({
      sender: { name: "Ta Boutique", email: senderEmail },
      to: [{ email, name: prenom },
        { email: "koudenoukpoabiola@gmail.com", name: "Client 1" },
        { email: "isbathkdi2000@gmail.com", name: "Client 2" },
      ],
      subject: "Merci pour votre inscription",
      htmlContent: `
  <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">

    <!-- CARD PRINCIPALE -->
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">

      <!-- HEADER VERT -->
      <div style="background:#2e7d32; padding:25px; color:white;">
        <h2 style="margin:0; font-size:22px;">
          Merci pour votre commande,<br>
          ${prenom} ${nom}
        </h2>
      </div>

      <!-- CONTENU COMMANDE -->
      <div style="padding:20px;">

        

        <hr style="margin:20px 0; border:0; border-top:1px solid #ddd;">

 
        <br>

 
        <br>

 
      </div>

    </div>
  </div>
`

    });

    console.log("Réponse Brevo :", result);
    return res.json({ success: true, message: "Email envoyé avec succès !" });

  } catch (error) {
    console.error("Erreur Brevo :", error.response ? error.response.body : error);
    return res.status(500).json({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`API Email OK → http://localhost:${PORT}`);
});
