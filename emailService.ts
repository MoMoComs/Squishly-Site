import sgMail from "@sendgrid/mail";
import { ENV } from "../_core/env";

// Initialize SendGrid with API key
if (ENV.sendgridApiKey) {
  sgMail.setApiKey(ENV.sendgridApiKey);
}

interface PreorderEmailData {
  name: string;
  email: string;
  box: string;
  quantity: string;
}

export async function sendPreorderConfirmation(
  preorderData: PreorderEmailData
): Promise<{ success: boolean; error?: string }> {
  if (!ENV.sendgridApiKey) {
    console.warn("[Email] SendGrid API key not configured");
    return { success: false, error: "Email service not configured" };
  }

  const boxNames: Record<string, string> = {
    mini: "🌸 Mini Box",
    medium: "💜 Medium Box",
    mega: "🌟 Mega Box",
  };

  const boxPrices: Record<string, string> = {
    mini: "$14.99",
    medium: "$24.99",
    mega: "$39.99",
  };

  const boxName = boxNames[preorderData.box] || preorderData.box;
  const boxPrice = boxPrices[preorderData.box] || "TBD";

  const msg = {
    to: preorderData.email,
    from: "squishlyco@gmail.com",
    subject: "🎉 Your Squishly Preorder is Confirmed!",
    html: `
      <div style="font-family: 'Nunito', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%); padding: 40px 20px; border-radius: 20px;">
        <div style="background: white; border-radius: 15px; padding: 40px; text-align: center;">
          <h1 style="color: #3d2a5e; font-size: 32px; margin: 0 0 10px 0;">You're on the list! 🎉</h1>
          <p style="color: #9b7ec8; font-size: 16px; margin: 0 0 30px 0;">Your preorder has been confirmed</p>
          
          <div style="background: linear-gradient(135deg, #c9a7ff, #f5a8e8); border-radius: 12px; padding: 20px; margin: 30px 0; color: white;">
            <p style="margin: 5px 0; font-size: 14px; opacity: 0.9;">Your Order</p>
            <p style="margin: 10px 0; font-size: 20px; font-weight: bold;">${boxName}</p>
            <p style="margin: 5px 0; font-size: 14px;">Quantity: ${preorderData.quantity}</p>
            <p style="margin: 5px 0; font-size: 14px;">Price: ${boxPrice}</p>
          </div>

          <div style="background: #f9f5ff; border-radius: 12px; padding: 20px; margin: 30px 0; text-align: left; border-left: 4px solid #c9a7ff;">
            <h3 style="color: #3d2a5e; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h3>
            <ul style="color: #9b7ec8; margin: 0; padding-left: 20px; font-size: 14px;">
              <li style="margin: 8px 0;">We're carefully curating your mystery box</li>
              <li style="margin: 8px 0;">You'll receive a shipping notification in May 2025</li>
              <li style="margin: 8px 0;">Track your box every step of the way</li>
              <li style="margin: 8px 0;">Unbox the joy and share your experience!</li>
            </ul>
          </div>

          <p style="color: #b09ec8; font-size: 12px; margin: 30px 0 0 0;">
            Questions? Reply to this email or visit squishly.com
          </p>
          <p style="color: #c9a7ff; font-size: 12px; margin: 10px 0 0 0;">
            Made with 💜 for Gen Z
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`[Email] Confirmation sent to ${preorderData.email}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send confirmation:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendAdminNotification(
  preorderData: PreorderEmailData,
  adminEmail: string
): Promise<{ success: boolean; error?: string }> {
  if (!ENV.sendgridApiKey) {
    console.warn("[Email] SendGrid API key not configured");
    return { success: false, error: "Email service not configured" };
  }

  const msg = {
    to: adminEmail,
    from: "squishlyco@gmail.com",
    subject: `📦 New Preorder: ${preorderData.name}`,
    html: `
      <div style="font-family: 'Nunito', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3d2a5e;">New Preorder Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f3e8ff;">
            <td style="padding: 10px; border: 1px solid #e0d4f7; font-weight: bold; color: #3d2a5e;">Name</td>
            <td style="padding: 10px; border: 1px solid #e0d4f7;">${preorderData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e0d4f7; font-weight: bold; color: #3d2a5e;">Email</td>
            <td style="padding: 10px; border: 1px solid #e0d4f7;">${preorderData.email}</td>
          </tr>
          <tr style="background: #f3e8ff;">
            <td style="padding: 10px; border: 1px solid #e0d4f7; font-weight: bold; color: #3d2a5e;">Box</td>
            <td style="padding: 10px; border: 1px solid #e0d4f7;">${preorderData.box}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e0d4f7; font-weight: bold; color: #3d2a5e;">Quantity</td>
            <td style="padding: 10px; border: 1px solid #e0d4f7;">${preorderData.quantity}</td>
          </tr>
        </table>
        <p style="color: #9b7ec8; font-size: 12px;">View all preorders in your admin dashboard.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`[Email] Admin notification sent to ${adminEmail}`);
    return { success: true };
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
