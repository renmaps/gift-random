import  friendlyCode  from "./randCode";

const codeEmail =() => {
const instructions = 'Use this code to <strong style="color: #000000;">Change your password.</strong> If you did not request this, please ignore this email. The code is valid for 6 minutes.';
const pReset = friendlyCode(); 
const text = pReset.join('');

const html= `
    <!DOCTYPE html>
      <html>
        <body>
          <div style="background-color: #f4f4f9; padding: 40px 0; font-family: Arial, sans-serif;">
            <div style="background-color: #ffffff; width: 400px; margin: 0 auto; padding: 30px; border-radius: 15px; border: 1px solid #dddddd; text-align: center;">
              <!-- Contenedor Grid Manual (usando inline-block para máxima compatibilidad) -->
              <div style="margin-bottom: 20px;">
                ${pReset.map(num => `
                  <div style="display: inline-block; width: 50px; background-color: #eeeeee; margin: 5px; padding: 15px 0; font-size: 20px; font-weight: bold; border-radius: 5px; color: #333333;">
                    ${num}
                  </div>
                `).join('')}
              </div>
              <p style="font-size: 14px; color: #555555; line-height: 1.5; margin: 0;">
                ${instructions}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    return {
        text,
        html,
    };
}
export default codeEmail;
