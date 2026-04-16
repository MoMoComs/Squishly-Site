/**
 * Email Templates for Squishly
 * Professional HTML email templates for customer confirmations and admin notifications
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export function getCustomerConfirmationEmail(
  customerName: string,
  boxType: string,
  quantity: string,
  email: string,
  orderId: number
): EmailTemplate {
  const boxEmoji = {
    mini: "🌸",
    medium: "💜",
    mega: "🌟",
  }[boxType] || "📦";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Nunito', 'DM Sans', sans-serif; background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%); margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(201, 167, 255, 0.2); }
          .header { background: linear-gradient(135deg, #c9a7ff 0%, #f5a8e8 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 32px; font-weight: 900; }
          .header p { color: rgba(255, 255, 255, 0.9); margin: 5px 0 0 0; font-size: 14px; }
          .content { padding: 40px 30px; }
          .order-box { background: #f9f5ff; border-left: 4px solid #c9a7ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .order-item { display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px; }
          .order-item-label { color: #9b7ec8; font-weight: 600; }
          .order-item-value { color: #3d2a5e; font-weight: bold; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #c9a7ff 0%, #f5a8e8 100%); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin-top: 20px; }
          .footer { background: #f9f5ff; padding: 20px; text-align: center; font-size: 12px; color: #9b7ec8; border-top: 1px solid #e0d4f7; }
          .emoji { font-size: 24px; margin-right: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><span class="emoji">🧸</span>Squishly</h1>
            <p>Squeeze the Stress Away</p>
          </div>
          
          <div class="content">
            <h2 style="color: #3d2a5e; margin-top: 0;">You're on the list! 🎉</h2>
            <p style="color: #9b7ec8; line-height: 1.6;">
              Hey ${customerName}! Thanks for preordering with Squishly. We're thrilled to have you join our community of stress-relief enthusiasts. Your mystery box is being carefully curated just for you.
            </p>
            
            <div class="order-box">
              <h3 style="color: #3d2a5e; margin-top: 0;">Order Details</h3>
              <div class="order-item">
                <span class="order-item-label">Order ID:</span>
                <span class="order-item-value">#${orderId}</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Box Type:</span>
                <span class="order-item-value">${boxEmoji} ${boxType.charAt(0).toUpperCase() + boxType.slice(1)} Box</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Quantity:</span>
                <span class="order-item-value">${quantity}</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Email:</span>
                <span class="order-item-value">${email}</span>
              </div>
            </div>
            
            <h3 style="color: #3d2a5e;">What's Next?</h3>
            <ol style="color: #9b7ec8; line-height: 1.8;">
              <li>We'll confirm your order within 24 hours</li>
              <li>Your box will be packed with love and care</li>
              <li>You'll receive a tracking number via email when it ships</li>
              <li>Unbox and enjoy your mystery items! 🎁</li>
            </ol>
            
            <p style="color: #9b7ec8; text-align: center; margin-top: 30px;">
              <a href="https://squishbox-kpyg3utk.manus.space/track" class="cta-button">Track Your Order</a>
            </p>
            
            <p style="color: #9b7ec8; font-size: 14px; margin-top: 30px;">
              Have questions? Reply to this email or visit our website. We're here to help!
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">© 2025 Squishly – Student-Run Mystery Box Brand</p>
            <p style="margin: 5px 0 0 0;">Made with 💜 by Gen Z, for Gen Z</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Squishly - Squeeze the Stress Away

You're on the list! 🎉

Hey ${customerName}! Thanks for preordering with Squishly. We're thrilled to have you join our community.

ORDER DETAILS
Order ID: #${orderId}
Box Type: ${boxEmoji} ${boxType.charAt(0).toUpperCase() + boxType.slice(1)} Box
Quantity: ${quantity}
Email: ${email}

WHAT'S NEXT?
1. We'll confirm your order within 24 hours
2. Your box will be packed with love and care
3. You'll receive a tracking number via email when it ships
4. Unbox and enjoy your mystery items! 🎁

Track your order: https://squishbox-kpyg3utk.manus.space/track

Have questions? Reply to this email or visit our website.

© 2025 Squishly – Student-Run Mystery Box Brand
Made with 💜 by Gen Z, for Gen Z
  `;

  return {
    subject: `🎉 Your Squishly Preorder is Confirmed! Order #${orderId}`,
    html,
    text,
  };
}

export function getAdminNotificationEmail(
  customerName: string,
  email: string,
  boxType: string,
  quantity: string,
  orderId: number
): EmailTemplate {
  const boxEmoji = {
    mini: "🌸",
    medium: "💜",
    mega: "🌟",
  }[boxType] || "📦";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Nunito', 'DM Sans', sans-serif; background: #f9f5ff; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(201, 167, 255, 0.15); }
          .header { background: #3d2a5e; padding: 30px 20px; text-align: center; }
          .header h1 { color: #c9a7ff; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .order-box { background: #f9f5ff; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 3px solid #c9a7ff; }
          .order-item { display: flex; justify-content: space-between; margin: 8px 0; font-size: 13px; }
          .order-item-label { color: #9b7ec8; font-weight: 600; }
          .order-item-value { color: #3d2a5e; font-weight: bold; }
          .footer { background: #f9f5ff; padding: 15px; text-align: center; font-size: 11px; color: #9b7ec8; border-top: 1px solid #e0d4f7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 New Preorder Received</h1>
          </div>
          
          <div class="content">
            <p style="color: #3d2a5e; margin-top: 0;"><strong>A new preorder has been placed!</strong></p>
            
            <div class="order-box">
              <div class="order-item">
                <span class="order-item-label">Order ID:</span>
                <span class="order-item-value">#${orderId}</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Customer:</span>
                <span class="order-item-value">${customerName}</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Email:</span>
                <span class="order-item-value">${email}</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Box Type:</span>
                <span class="order-item-value">${boxEmoji} ${boxType.charAt(0).toUpperCase() + boxType.slice(1)} Box</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Quantity:</span>
                <span class="order-item-value">${quantity}</span>
              </div>
              <div class="order-item">
                <span class="order-item-label">Time:</span>
                <span class="order-item-value">${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <p style="color: #9b7ec8; font-size: 13px;">
              <strong>Next Steps:</strong> Log in to your admin dashboard to manage this order, update its status, and add tracking information.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">Squishly Admin Notification</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
NEW PREORDER RECEIVED

Order ID: #${orderId}
Customer: ${customerName}
Email: ${email}
Box Type: ${boxEmoji} ${boxType.charAt(0).toUpperCase() + boxType.slice(1)} Box
Quantity: ${quantity}
Time: ${new Date().toLocaleString()}

Next Steps: Log in to your admin dashboard to manage this order and update its status.

Squishly Admin Notification
  `;

  return {
    subject: `📦 New Preorder #${orderId} - ${boxType.charAt(0).toUpperCase() + boxType.slice(1)} Box`,
    html,
    text,
  };
}

export function getOrderStatusUpdateEmail(
  customerName: string,
  status: string,
  trackingNumber?: string
): EmailTemplate {
  const statusMessages: Record<string, { emoji: string; message: string }> = {
    confirmed: {
      emoji: "✅",
      message: "Your order has been confirmed and is being prepared for shipment.",
    },
    packed: {
      emoji: "📦",
      message: "Your box has been packed with care and is ready to ship!",
    },
    shipped: {
      emoji: "🚚",
      message: `Your box is on its way! ${trackingNumber ? `Track it here: ${trackingNumber}` : ""}`,
    },
    delivered: {
      emoji: "🎉",
      message: "Your box has been delivered! We hope you love your mystery items!",
    },
  };

  const statusInfo = statusMessages[status] || statusMessages.confirmed;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Nunito', 'DM Sans', sans-serif; background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #dbeafe 100%); margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(201, 167, 255, 0.2); }
          .header { background: linear-gradient(135deg, #c9a7ff 0%, #f5a8e8 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; text-align: center; }
          .status-emoji { font-size: 48px; margin-bottom: 15px; }
          .footer { background: #f9f5ff; padding: 20px; text-align: center; font-size: 12px; color: #9b7ec8; border-top: 1px solid #e0d4f7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
          </div>
          
          <div class="content">
            <div class="status-emoji">${statusInfo.emoji}</div>
            <h2 style="color: #3d2a5e; margin-top: 0; text-transform: capitalize;">${status}</h2>
            <p style="color: #9b7ec8; font-size: 16px; line-height: 1.6;">
              ${statusInfo.message}
            </p>
            ${trackingNumber && status === "shipped" ? `
              <p style="background: #f9f5ff; padding: 15px; border-radius: 8px; color: #3d2a5e; font-weight: bold;">
                Tracking: <code>${trackingNumber}</code>
              </p>
            ` : ""}
          </div>
          
          <div class="footer">
            <p style="margin: 0;">© 2025 Squishly</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Order Status Update

${statusInfo.emoji} ${status.toUpperCase()}

${statusInfo.message}

${trackingNumber && status === "shipped" ? `Tracking: ${trackingNumber}` : ""}

© 2025 Squishly
  `;

  return {
    subject: `${statusInfo.emoji} Your Squishly Order is ${status.charAt(0).toUpperCase() + status.slice(1)}!`,
    html,
    text,
  };
}
