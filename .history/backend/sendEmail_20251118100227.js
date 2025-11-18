import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
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
apiKey.apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, cartItems, totalItems, totalPrice } = req.body;
  
  console.log("📬 Données reçues:");
  console.log("- Nom:", nom, prenom);
  console.log("- Email:", email);
  console.log("- Articles:", JSON.stringify(cartItems, null, 2));
  console.log("- Total:", totalItems, "articles pour", totalPrice, "F");
  
  if (!nom || !prenom || !email) {
    return res.status(400).json({ success: false, message: "Nom, prénom et email requis." });
  }

  // Générer un numéro de commande unique
  const orderNumber = Date.now().toString().slice(-7);
  const orderDate = new Date().toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });

  // Générer le HTML des articles avec images
  const cartItemsHtml = cartItems.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
        <div style="display: flex; align-items: center; gap: 15px;">
          <img src="${item.image || 'https://via.placeholder.com/80'}" 
               alt="${item.name}" 
               style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
          <div>
            <div style="font-weight: 600; color: #333; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 13px; color: #666;">Quantité: ${item.quantity}</div>
          </div>
        </div>
      </td>
      <td style="padding: 15px; text-align: right; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #333;">
        ${(item.price * item.quantity).toFixed(0)} F
      </td>
    </tr>
  `).join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 20px 0;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              
              <!-- Header vert avec thumbs up -->
              <tr>
                <td style="background: linear-gradient(135deg, #2e7d32 0%, #43a047 100%); padding: 30px 25px; text-align: left; position: relative;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <h2 style="margin: 0 0 8px 0; font-size: 24px; color: white; font-weight: 600;">
                        Merci pour votre commande,
                      </h2>
                      <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 700;">
                        ${prenom} ${nom}
                      </h1>
                    </div>
                    <div style="font-size: 48px;">👍</div>
                  </div>
                </td>
              </tr>

              <!-- Informations commande -->
              <tr>
                <td style="padding: 25px; background-color: #fafafa; border-bottom: 1px solid #e0e0e0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <img src="https://api.dicebear.com/7.x/initials/svg?seed=${prenom}%20${nom}&backgroundColor=da9a90" 
                               alt="Avatar" 
                               style="width: 40px; height: 40px; border-radius: 50%;">
                          <div>
                            <div style="font-weight: 600; color: #333; font-size: 15px;">${prenom} ${nom}</div>
                            <div style="font-size: 13px; color: #666;">${orderDate}</div>
                          </div>
                        </div>
                      </td>
                      <td style="text-align: right; padding: 8px 0;">
                        <div style="background-color: #e8f5e9; color: #2e7d32; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 13px; font-weight: 600;">
                          N° ${orderNumber}
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Liste des articles -->
              <tr>
                <td style="padding: 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td colspan="2" style="padding: 20px 25px 15px; font-size: 16px; font-weight: 600; color: #333; border-bottom: 2px solid #e0e0e0;">
                        ${totalItems} produit${totalItems > 1 ? 's' : ''}
                      </td>
                    </tr>
                    ${cartItemsHtml}
                  </table>
                </td>
              </tr>

              <!-- Récapitulatif paiement -->
              <tr>
                <td style="padding: 25px; background-color: #fafafa;">
                  <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0;">
                    <div style="font-weight: 600; color: #666; margin-bottom: 8px; font-size: 14px;">Payé par:</div>
                    <div style="display: flex; align-items: center; gap: 8px; color: #333; font-size: 14px;">
                      <span style="font-size: 18px;">🎫</span>
                      <span>Payé par code promo</span>
                      <span style="margin-left: auto; font-weight: 600;">${(totalPrice * 0.35).toFixed(0)} F</span>
                    </div>
                  </div>
                  
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px; color: #333; font-size: 14px; margin-bottom: 8px;">
                      <span style="font-size: 18px;">💵</span>
                      <span>À payer en espèce</span>
                      <span style="margin-left: auto; font-weight: 600;">${(totalPrice * 0.65).toFixed(0)} F</span>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Total final -->
              <tr>
                <td style="padding: 20px 25px; background-color: #fff; border-top: 2px solid #2e7d32;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 18px; font-weight: 700; color: #333;">Total:</span>
                    <span style="font-size: 24px; font-weight: 700; color: #2e7d32;">${totalPrice.toFixed(0)} F</span>
                  </div>
                </td>
              </tr>

              <!-- Adresse de livraison -->
              <tr>
                <td style="padding: 25px; background-color: #fafafa; border-top: 1px solid #e0e0e0;">
                  <div style="display: flex; align-items: start; gap: 12px;">
                    <div style="font-size: 20px; margin-top: 2px;">📍</div>
                    <div>
                      <div style="font-weight: 600; color: #333; margin-bottom: 4px; font-size: 14px;">Adresse de livraison</div>
                      <div style="color: #666; font-size: 14px; line-height: 1.5;">
                        Cotonou, Cotonou, Bénin
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 25px; text-align: center; background-color: #fff; border-top: 1px solid #e0e0e0;">
                  <div style="color: #999; font-size: 13px; line-height: 1.6;">
                    <p style="margin: 0 0 8px 0;">Merci pour votre confiance !</p>
                    <p style="margin: 0;">Pour toute question, contactez-nous sur WhatsApp</p>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail({
      sender: { name: "Téranga Chez Pape", email: senderEmail },
      to: [{ email, name: `${prenom} ${nom}` }],
      subject: `✅ Confirmation de commande N°${orderNumber}`,
      htmlContent: emailHtml
    });
    
    return res.json({ success: true, message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur Brevo :", error.response?.body || error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API Email OK → http://localhost:${PORT}`);
});