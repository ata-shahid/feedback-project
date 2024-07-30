import { resend } from "@/lib/resend"; 
import VerificationEmail from "../../emailTemplates/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendEmail(email:string,
    username:string,
    pin:string
):Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['ata.shahid@yahoo.de'],
            subject: 'feedback project verification code',
            react: VerificationEmail({username, pin}),
          });
        return{success:true, message:"Email sent successfully"};
    }catch(emailError){
        console.log("Error sending email", emailError);
        return{success:false, message:"failed to send email"};
        
    }
}


