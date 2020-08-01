const nodemailer = require("nodemailer");

var en =
    '<html>' +
    '' +
    ' <style>' +
    '     @font-face {' +
    '        font-family: \'Avenir\';' +
    '        src: url(\'https://api.mybarrefitness.com/app/font\') format(\'truetype\');' +
    '    }' +
    '     *{' +
    '         font-family: \'Avenir\';' +
    '' +
    '     }' +
    '     .main{' +
    '         padding: 20px;' +
    '         background: white;' +
    '         font-size: 14px;' +
    '         color: black;' +
    '         display: flex;' +
    '         flex-direction: column;' +
    '         background: linear-gradient( #d9bdbbe3 , #d9bdbbe3 ,  #d9bdbb9d ,   #f3d6d48e ,  #f3d6d46c ,#f3d6d42c);' +
    '         border-radius: 8px;' +
    '         box-shadow: 0px 0px 8px 0px #a6a6a6;' +
    '     }' +
    '     .lrview{' +
    '         width: 100%;' +
    '         height: auto;' +
    '         display: flex;' +
    '         flex-direction: row;' +
    '         align-items: center;' +
    '         line-height: 20px;' +
    '     }' +
    '     .lrview .l{' +
    '         font-size: 12px;' +
    '         color: black;' +
    '         font-weight: 600;' +
    '         line-height: 20px;' +
    '         text-transform: uppercase;' +
    '     }' +
    '     ' +
    '     .lrview .r{' +
    '         font-size: 14px;' +
    '         color: black;' +
    '         margin-left: 10px;' +
    '         line-height: 20px;' +
    '     }' +
    '     span{' +
    '         margin-bottom : 4px;' +
    '     }' +
    '     ' +
    '     .imgCont{' +
    '         width: 100%;' +
    '         height: 60px;' +
    '         display: flex;' +
    '         justify-content: center;' +
    '         align-items: center;' +
    '         border-bottom: 0.5px solid white;' +
    '         padding-bottom: 10px;' +
    '         margin-bottom: 20px;' +
    '     }' +
    '     ' +
    '     .imgCont .icon{' +
    '         width: 200px;' +
    '     }' +
    '     ' +
    '     .disclaimerCont{' +
    '         border-top: 0.5px solid #d9bdbbe3;' +
    '         margin-top: 20px;' +
    '         color: gray;' +
    '         font-size: 8px;' +
    '         text-align: left;' +
    '         padding-top: 20px;' +
    '     }' +
    '     .copyright{' +
    '         font-size: 10px;' +
    '         color : gray;' +
    '     }' +
    ' </style>' +
    '    ' +
    '    ' +
    ' <body>' +
    '     <div class="main">' +
    '        <div class="imgCont">' +
    '            <img src="" class="icon"/> ' +
    '        </div>' +
    '        <span>Dear <b>%user</b>,</span></br>' +
    '        <span>We hope you are well and have been practicing your one hour exam class with your students.  </span></br>' +
    '        <span>' +
    '            The deadline for the video submission is approaching soon.  Please log into your profile in the MYbarre WeChat Mini Programme and upload your exam submission. If you fail to upload your video before the submission date, your profile and access to the teaching materials will be locked.' +
    '        </span></br>' +
    '        <div class="lrview">' +
    '             <div class="l">Membership ID : </div>' +
    '             <div class="r">%membershipId </div>' +
    '        </div> ' +
    '        <div class="lrview">' +
    '             <div class="l">Status : </div>' +
    '             <div class="r">%status </div>' +
    '         </div> ' +
    '        <div class="lrview">' +
    '             <div class="l">Video Submission Deadline : </div>' +
    '             <div class="r">%deadline </div>' +
    '         </div> ' +
    '        </br>' +
    '        <span>If you have any questions please reach out to us at <b>info@mybarrefitness.com</b></span>' +
    '        </br>' +
    '        <span>Kind regards,</span>' +
    '        <span>Ann & Siri</span>' +
    '        <span>MYBarre Founders</span>' +
    '' +
    '        <div class="disclaimerCont">' +
    '            ' +
    '            <span class="copyright">© 2020 MYBarre Fitness . All rights reserved.</span>' +
    '            </br></br>' +
    '            This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee, you should not disseminate, distribute or copy this email. Please notify the sender immediately by email if you have received this email by mistake and delete this email from your system. If you are not the intended recipient, you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited' +
    '            </br></br>' +
    '            Any views or opinions presented in this email are solely those of the author and do not necessarily represent those of the organization. Employees of <COMPANY> are expressly required not to make defamatory statements and not to infringe or authorise any infringement of copyright or any other legal right by email communications. Any such communication is contrary to organizational policy and outside the scope of the employment of the individual concerned. The organization will not accept any liability in respect of such communication, and the employee responsible will be personally liable for any damages or other liability arising' +
    '            </br></br>' +
    '            Our organization accepts no liability for the content of this email, or for the consequences of any actions taken on the basis of the information provided, unless that information is subsequently confirmed in writing. If you are not the intended recipient, you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.' +
    '        </div>' +
    '     </div>' +
    ' </body>    ' +
    '</html>';



var cn = '<html>' +
    '' +
    ' <style>' +
    '     @font-face {' +
    '        font-family: \'Avenir\';' +
    '        src: url(\'https://api.mybarrefitness.com/app/font\') format(\'truetype\');' +
    '    }' +
    '     *{' +
    '         font-family: \'Avenir\';' +
    '' +
    '     }' +
    '     .main{' +
    '         padding: 20px;' +
    '         background: white;' +
    '         font-size: 14px;' +
    '         color: black;' +
    '         display: flex;' +
    '         flex-direction: column;' +
    '         background: linear-gradient( #d9bdbbe3 , #d9bdbbe3 ,  #d9bdbb9d ,   #f3d6d48e ,  #f3d6d46c ,#f3d6d42c);' +
    '         border-radius: 8px;' +
    '         box-shadow: 0px 0px 8px 0px #a6a6a6;' +
    '     }' +
    '     .lrview{' +
    '         width: 100%;' +
    '         height: auto;' +
    '         display: flex;' +
    '         flex-direction: row;' +
    '         align-items: center;' +
    '         line-height: 20px;' +
    '     }' +
    '     .lrview .l{' +
    '         font-size: 12px;' +
    '         color: black;' +
    '         font-weight: 600;' +
    '         line-height: 20px;' +
    '         text-transform: uppercase;' +
    '     }' +
    '     ' +
    '     .lrview .r{' +
    '         font-size: 14px;' +
    '         color: black;' +
    '         margin-left: 10px;' +
    '         line-height: 20px;' +
    '     }' +
    '     span{' +
    '         margin-bottom : 4px;' +
    '     }' +
    '     ' +
    '     .imgCont{' +
    '         width: 100%;' +
    '         height: 60px;' +
    '         display: flex;' +
    '         justify-content: center;' +
    '         align-items: center;' +
    '         border-bottom: 0.5px solid white;' +
    '         padding-bottom: 10px;' +
    '         margin-bottom: 20px;' +
    '     }' +
    '     ' +
    '     .imgCont .icon{' +
    '         width: 200px;' +
    '     }' +
    '     ' +
    '     .disclaimerCont{' +
    '         border-top: 0.5px solid #d9bdbbe3;' +
    '         margin-top: 20px;' +
    '         color: gray;' +
    '         font-size: 8px;' +
    '         text-align: left;' +
    '         padding-top: 20px;' +
    '     }' +
    '     .copyright{' +
    '         font-size: 10px;' +
    '         color : gray;' +
    '     }' +
    ' </style>' +
    '    ' +
    '    ' +
    ' <body>' +
    '     <div class="main">' +
    '        <div class="imgCont">' +
    '            <img ' +
    '                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABNkAAAH9CAYAAAAnLapgAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAABNmgAwAEAAAAAQAAAf0AAAAAUaMx/QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHs3QeYFFX293EEzCIiCgZQYEVRMbuuWQTTirprxpww57RGdE24q+Ia1qyYA+aclV0V9a+uaw5rFrMrhlUQGOj3dw739FvdM8N0T+yZ+dbz9FR1T4Vbn3uruu7pW7c6dGBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQaE8CuVxuFu1vR706p1fH9FmzMvz5z3+ONHRqqu2n9XbSjjXZNpoVrY1srKgMtkj5M0pLh5XDpip/bSS72A0EEEAAAQQQQAABBBBAoHIEoiJHZa5y8qQdp8QCbDUOzRVoSNupKR01fVZjWkv8sKb1WWCPoQUFZlLOmi1vUoC3eHsWjC3+rAWl2DQCCCCAAAIIIIAAAi0rUFOFqmVTxNYRmFFpm14EYWU1V/QZbxFoFoHPPvus14033rjxq6++uuKss85ate2229652WabPW0btwCIhqYsm/myP27cuBWvueaaXbt37/75mWeeea22+18lIf//xsD49ttvF7nyyis3/eabbxYfMWLEFfPPP/+nWq8FUoqPycbYHOuoW8DzV+Vs7gsuuGCr559/fq3111//sb333vtu5f80Ld6o+V9LcvL5/8477yzy7rvvzrX88sv/3Ldv36/S/Pn/17I8HyOAAAIIIIAAAggggAACCLSAgFUYLXDR9ZFHHhkwduzYJTKtOPx/LZAmNtk+BSxw0OHmm2/ecvXVV/+fgk0WSPNX7969cyeffPIZKpvWkscDbTZu7CHKvsbzH3300RevuuqqE7UNT8Mmm2zy/muvvbZc2qantQHb92NLwbVd1lhjjR9iX9dbb73/jho16ohG2kYDktc+F02txzpMmDBhseHDh49VgNfzfvHFF8/tvPPOTz355JO/SzJNeW70db/99ttLHnXUURepfHzXr1+/KgX6PlearnnwwQfXaoY0tM8CwF4jgAACCCCAAAIIIIAAAg0Q8MqcWupsN3To0P8MGDBg6nLLLffrXnvtdf/777+/RFpvQ4MJDUgei7YjAS9nd91110Yqh9ZayIIbVbPNNtuU2WeffYq979q1a27MmDGbJpOmKpd+TKhF2V9TGnKWBgVbPA0bbLDBJx9//HFfS0MEZFJ6yhnFvg5ZeumlPYijhatiP9Viqer+++/fIK3Qg4rlrJx56yeQCbDOrnPgI1qLl8E55pjD8r7K3m+11Vava76utoWY36YbcfCycdNNN2295pprfq/1RvnIj1dbbbWfdRzskLbp5bURt8+qEEAAAQQQQAABBBBAAAEE6iHglTndkrdVnz598hU4rcen//CHP7yhSmQPW28Dggn1SBaLtDeBCFZoPM/WW2/9ovY/16VLFw9q2bS95pxzzqk21m2jt2lsQ6MHnzLp6Dpo0KDPtI3cXHPN5cGVNO1pOuyww66yBGiYJZaZ8bbuvzG/xh3VMmqslvB9Tbe/5uadd17fz8GDB3/5ySef9LM1cvzV7drQOSJfbD2HHnrotRrlFPSc2qlTJy9/HTt2zHXu3PnXbt265c4+++w/2Hwqi41aBiOfH3/88TVWWGGFyZYGlT8L8E5X+Ziu7U9XoNk/X2WVVX7NBGIJtFmGMCCAAAIIIIAAAggggAACLSEQFUqN595iiy3eUBqsldAUq+irUjldAQ2vyB1//PHnpPR5QK4l0so227ZApix23Hfffe/U3uYDajYdLwUaPPik8np3EmnUAIetM5OWeXXb5nj7SK2YolVdzgIt+qxqnnnmyV199dXDbBkN9UmHH08HHnjg37V8bu655y4IKFpgxT4/5JBDrtHYhrKDeTMW428ZAvkfHXr16mX5PN2CWxp7GVRrRp9eccUVf3zqqaeWsfVGUMymG3PYc889H9T6LOBaUC7sM3vZudrG+iHkJZXZOTWdL7s2zYAAAggggAACCCCAAAIIINCMAhFM+PDDD3uuvPLKP2nTuWyFMrXemG79YN13330bpaTVJ5jQjHvFplqpgAc3Lrnkkt3tdlDtw7RoPaRpDyrYWEEOD7L98Y9/vCvtZ1OVR28VdNlll+0233zz2fanZ9Oj1k0edFt33XU//de//rV8SktZLYkiOHPnnXeuPXDgQA9ox3ptX1OrtioF+CyYt2MT729affsdRX7ovNhjyJAhn1seZFsw2vsI8uqHh7OSVKP+8BBpGD169OClllqqWrmzNBS9qnr06JHTgxmGWnoau1WdrZMBAQQQQAABBBBAAAEEEECgdAEPDKiT9UO0iFXgpqWWOl6Zi0r/Rhtt9Pb48eO9f7aoCJa+CeZEoHaBKE8qX/3XWmst738q23JMS+YDC80VZIsAtI31NMloWZe/ZdTSpJZncevqc5rPgy2xXO17W+0/HiRUUGWHmoJ52l8P5q299trjX3zxxZXS0mUF86ptkQ+qCUS+aTzXPvvsc4tmsNtEa8xvtaJ8VfPNYSuJ5aqtsP4feHk47rjj9rLV61zsZcyma3l5EPYvf/nLdrZJgmymwIAAAggggAACCCCAAAIItJBAVBI1nn2XXXZ5QsmodpteBBN23333RyOZsVy8Z4xAfQSiHGncbaeddnpG67BbMwuCG/ZZvJoryGb7EsG/77//fnEFub6zNGSDf+m2ag+CaN7TbBkNZbVsyuz/LPvtt5/1M2fbKAis6LbUCObZbYGz2kZiOZtmaBQBD26deeaZJ2ht1oqwKrUk9LIXwU49hOBr3Sa6WtpiUwQ7PR2nnnrq8EiHjWfyqtJt/Tm1rDvS0kSQzRQYEEAAAQQQQAABBBBAAIEWFIhgwptvvrmsbhv1fn6iBZuS5betWaXTpk8//fTjU1KbooLZggpsuoUEPCilp3iere377XjZ4IZ9ln01Z5AteXj6Lr/88l26d+9uaSm4jVXHiffRpeNmYib4UlagLY6/iRMn9lpnnXU8mKfASUGgUZ3de6Dt5JNPPiObrjTNqGECnl+33377xnqi689aVcFt86llr7co1O3Me6ZNeTCsYZutcWlfr8qEB9lKaclmQTa1fPuTrY0gW42mfIgAAggggAACCCCAAAIINLuAB82sD6qFF17YggnWB1W+w297op0+y1n/bHfddRf9szV79rTJDXqZu/7667fu16+fB3ejnFlZq+nV3EG2aDFm42hppqBGjS3Ntttuuxc0X2fLqVjOpksc3OLWW2/don///r9qGXuKZf7403779HLLLffrs88+Gy2pmirQU2KSW/9skU8aL7D++uvX1g+bBzyPOuqoC1P+NuUDKOoVZFNLtqMtNwiytf4yyR4ggAACCCCAAAIIIIBAGxBIlU2v6B9xxBGXa5eqPe0wbuPbbLPN3tL8PW23oxVOGyBgF5pRIMqNbsXso1vwftSm7TZlby1k07W9mjvIZiTp2LDx3Ntss83z9lFxh/gKSHsgxjrE13zWMqo+gRhvUSUba61mt4164NGm7RWt29Qp/6cafqPPOP4MoZ5D5KstfvDBB9+gUU236nq+6kEbr2v+5niCJ0G2euYniyGAAAIIIIAAAggggAACFSUQlU6NewwdOvRNJc4CbTXetqZgwjkp8R4YqKgdITEVLZApZ530UIF7lNhqwQ37rKZXSwTZEqaX87vvvnuDZZZZplqru/Tk0ekKjOWuvfba7dMyZbU0y7h0GTZs2Djb/+iPLSwU3PNWdIcccsg1aRv1CealRdv9yPPn5ptv3nKhhRby8lZT68Fll1226pFHHlk3aTX1+Y4gW7svlgAggAACCCCAAAIIIIBAWxLwSp4CBX/o06ePVzxnnXXW/G1rKZjgLY7OPffcQ9OON3XFsy35si8dOngZs1uTrT8pgdityQVBNWu1le0XUPP4/1swyGb5FgGQkZYeBWSmZvuPi/RaS7NPPvmkny0QLfZsusTBt3H//fevr+CO3zYa69Xy3j+ixv5EyauuumqntE5fpsT1M5sEIl+eeOKJNVdccUXvh00B0nxLSsvXaJ14wgknWH+BNnhL3xmTTfY3ylhZfbJxu2iT5QcrRgABBBBAAAEEEEAAAQQaLOAVvfPOO+8grcmCGwVP2ovb+tZYY43vPvzww6XS1gi0NZi9XazAy4n167fUUkt5q6zob0x774E0BXXzrSezLYvs/y0ZZMu0NJt3jz32iBZ4+bRa+hQQi5Zmo1Nudozl0vtSRn78jR49eodu3bqZSUEQUgYeDNITTz974YUXVoztlLJi5lEmqX89c9B4Lj1R+UmbLG4xGE9U3n///W9JZs3VYpAgWwJnhAACCCCAAAIIIIAAAgi0CYFMJXSOXXfd9THtlPVB5cEDm07vPbiw+eabv6H56Z+tTeR80+5EplzNs/XWW79o5ag4uKEAkpernXfe+SGVLe//TEG3fAujlgyymU60gJo0adJiCnL5k0CLW0DFk3hPPfXUU5JoWQHojNMs++67723mFP2x2bS9Igi01VZbNeRhCyl57W7kgayRI0eeaJYqU8V933l5W3fddb98/fXXlzadyPdmkCLI1gzIbAIBBBBAAAEEEEAAAQQQaFaBTEW/u/pne0sbr9bZewQ86J+tWbOmVW4sypMlfvjw4XdoVK0ftniYgN1uqfnnPvHEEw+0+aJ1mE1HmVNH9HfpvQ0elJgx2Wx/PWh2xRVX7Ny9e3cPeunWwvwt1XF758orrzzpqaeeiieBlhVoi6DOxIkTeyvY8632rODBEOl2Rg98n3zyyfagBBvK2saMRdrdXze68847N1Hfen6baLa1pMqX5+OAAQOqxo4du3bSac4yRpCt3RVJdhgBBBBAAAEEEEAAAQTai4BX+NQ/2zZ9+/a1YMK0bDAh9aM1vXfv3jl1CL9xQmnOCml7yYe2sJ8e3LB+2NQKK8qSB6i0cxZI8+DGSiut9Mszzzyzqu3w4Ycffrz9Ty3Z8q0oKyHIFgFDG++33363WhrVms1b4Nm0vaKF3nbbbdeQlmZuduWVV+644IIL2nrtttFsMC/MJikgtLr+bwOBthkO1f5G4FL51mPw4MFfaYZqPxxEWWvBHw4IslXLOT5AAAEEEEAAAQQQQAABBNqOgFf6FPC4SLtU0KoovfdbqzbaaKO3P/jgg/6221GZtWkGBKI8/PDDD33XXHPNHyRiQan8LaDZVlmnn376SSF27LHHHmPzRmAtO93CLdmy/Xp1XWuttT63tBXf0qmAmAfeFLA5S4EdO47K6tcrgnlarsMBBxwwxrYht3zA0d4rmOfb2HbbbV/S/LPavNnl7D3D/zeRzZy6Bbc2S7fdcsst7Rb4Oc2tBSwJslFgEUAAAQQQQAABBBBAAIG2KhCVTI27Dxs2bKz2s1qrnegfavfdd380HGK5eM+4fQpEOdC4q/r3e0AK1cpPtPraYYcdntV8FmTwQMOf/vSnig2ypdz0DvRvuummP/bv39+fBJq99TC19LSWeLk77rhjg7SM71uarnOU8Ztz++23H6cFqrW+0jY90Kag5Dma31qylRXMqzMRbWMGdz/ttNO8TCmwW/BkWAVyPei7+uqrf5W5xbc5niZarOvpVGCap4sWy/AeAQQQQAABBBBAAAEEEGgLAtES6c0331xG/Ux5J+HR75T2L2ctkTSuUkU1p5ZIdoufDS1RQZ2xZf5WkoAHDUaMGHG2EuW3fqby4rdVRjkaNGjQx2+99dbAlHBvkdUKgmyWXL89U8fISNs/tTTz48Om7RX7t8EGG3z4ySef9NNnHeJ4sukSB9/GvffeO3jgwIEezFPgLn/baNy2rWBb7uqrr94xrbOsYF6J6Wits7nfY489trZuR56onbBymPeL85d9fskll+yZdrKl/AiytdZSRroRQAABBBBAAAEEEEAAgTIEvKKqzt53XXjhhb2Cmu0fKlrwLLLIIrm77rprSFpvS1VUy9gtZm1CAS8z1sm8OpL3W/GinGibuSg/Xbp0yak12NYpHVZmvNy0hiBbpqXZvGpp9pztV7TMs2l7KdDm+37ooYeO1nsb6tPSzE0UoDtNy5tdQUusCOatv/76n73//vtL2EbqEcyzxdrUkMmf2dRScqx2rtqTkqMlrvrXu6kCWgJGPtOSrU2VRHYGAQQQQAABBBBAAAEEEKgu4K3TjjzyyMv0r5wqpwWtdqLz98033/xtVVZ72uJU9KsjtodPMsGNLurj6iXtc7XbHBUo8tsc9RTRkWn+CD61miBbyktPr7U00xMrJ9u+RtDLpqOllJ6emhs9evQO2WXSdJ2jrOeee+5pT1atdttt9Nd20EEHXZtW2DGWq3MDbXCG7L4ffPDB1yWzgj7toh89PcH1ywoJThJka4NlkV1CAAEEEEAAAQQQQAABBKoJRKVV4x6bbbbZW5oh3/G6TdtLLZW8EnvccceNSivw1kxpmlE7EMiUk0777LOPB4QUzCgIbkRrr9QPm5eRWE5ErS3IZrnqab7qqqt26tq1qx0L9iRQPyY0bQ9v8D6/1llnnfEvvPDCiraAhrJuqY6A9cSJE3spKPStlreHLRQ8QKJjx44euNS8p/sW2vfTRr1cXX/99VsvuuiinifZlpTKE2+Rq1aWVXo669rJy/MxTbfEiCBbS6izTQQQQAABBBBAAAEEEECghQS8EnjjjTdutdhii3kQIdu/kSr59plX/EeNGnVYSiOBthbKrBbarJcR9W+1u1pXeXlI5cLLiz7z8rHqqqv+/Nxzz61cQxnx5VvD7aLhGwFCG+vplXfoc2tpVmNgUbeVvqj56vskUD+Wrrzyyh179OhhngXBvGhBt8IKK/yqwNHqNdhGktv0OAKScu45ZMiQL7Sz1QKSmZaUZyWMsoKeTQRIkK2JYFktAggggAACCCCAAAIIIFCpAl4RPO+88w5SAq2iX5XtzD5a16y55prfffbZZ0umnSDQVqm52bjp8rJh/fItueSS3qoqWgxpM7kUbPPPR44ceWItZaPVBdlsPyKwo5ZmvdVibYLtb9yOaNN2jERLT817mi2joazjIoJ5tqD6ELtNo1qDedtuu+2/GhDMs020yiGMNJ5r7733HqOdqPXW2v333//mtJNxq3JL77OXfZUP+mRr6Zxg+wgggAACCCCAAAIIIIBAcwhkKrFz7Lbbbo9qm9U6E1f/Ux5I0W2lb2j+7pauCEI0RxrZRvMLZMrFfFtttdULSkG1hwAo4Oatuw4//HDr18+GmoJMrTLINmN3ZtwCesstt/yhf//+/iTQmm5RXH755SeNGzfut2mZmgzSv6qP4jiS90Jrr732N5qjIJhn77VNP/6OOeaYUZqvs60l8sem2/jg5eeMM84Yof20wG7BQyLi1l3dcvvV66+/vrRZhGkFuBBkq4BMIAkIIIAAAggggAACCCCAQLMKRIVd4+5Dhw71/tkisKaE+G2BEVA59thjz0mJa9cdsTdrBrXMxjxYpAcZWH5b4KfgwRhxK+OGG2748RdffLG4JbGW4EZrDrLZbrmD9m2kpq0VVYFDtG7TbYyfyGExW6AWB/tXbYPf2jhmzJjN1WJwkmaywJr3MWbTqT+46dZ6TvNsnFbirrWtsI187i72RFs9hOJns6jtdvZLL710jwp0IcjWRgoiu4EAAggggAACCCCAAAIIlCvgFULrWLxPnz7RP1S1in7v3r1zVulNK28PFf1yHdvC/B7cuOGGG7bp16+fB5UU6MmWBZ/u0qVLTuVlizrKgpeR1tQnWzYDMwHoeYcNG/as/lftyaoKSHuLvkMOOeSqtGx9bleMgMxpto3iYF4ENQcPHvxxhTw5M8vU6NMRqJR/T+3zV2ZSHPhXwM1b+B199NEXaL5KbOEXecrtoo1eQlghAggggAACCCCAAAIIIFD5Al4pPOqooy5VUqv1DxUV/Y022uid8ePH90+74wGZyt81UliKQAQ3vvrqq77qh+8nLVPQyby9j07mR4wYcUZa58zKgJep1hpkS/vn+3DfffcNGThwoAcdsy3NUh+GVRZ0HD169A7ZZdJ0naNMMG8eBfOe0QLVbs/V8efBvIMPPvjaNH99gnl1pqWlZwgLS8dBBx10o0bVzkV6oq0H2LbccsvXNP8cNm92OXtfAQNBtgrIBJKAAAIIIIAAAggggAACCLSIQFRSNV5AT00cq0RU6x9q7rnn9oq++m97LCWS20ZbJLcaf6OZ/O80fPjwey3/a3uq5g477PBsZv62HmQzbA+YKLB4irko0Fhj32BqdTX+008//Y0tEAFLmy5xiGDeoGWXXdb7gIvAtpb3hy1oXKVbt3NXXHHFzmmdvkyJ628ts/k+2VOPe/bs6berZ4Oa2n9vSalbSKc+/PDD66SdKqsvvGaC8P1QOaAlWzOBsxkEEEAAAQQQQAABBBBAoKIEIjDw3nvvLbPSSitNVuIs0DLNxvaKVjuq9ObOPvvsI1Li22JFP+1auxp5Pl5++eW7K7gTtwx7vlveR8Bn0KBBH7366qsDk0xdwQ1fZytvyZZvJaXA4jx77LHH3eah48JbU9l08omWZleHTQQi0/tSRu519dVXD5t//vmr5UF09L/WWmt99txzz62cVjizIGcp26ykebw8Pfroo2utsMIKvyhh+XJn03b+0cMP3P2EE044MyW8rjLYUvvneUmQraX42S4CCCCAAAIIIIAAAgggUBkCXmm98sord1lkkUW81Ui2T64Iuq2++uo/PPvss6ulJHuFsjKSTyrqIeB5bv3tqfN9DxZFiyGtywIbFvCZZoEf67cvrb+UPPd5WnuQzfY3AtATJ07sradZ/lcfFdxKawEgvTwAdMopp5yajMoKAGWDcvvvv/+tto3aWhNus802L2v+2Ww72eXSdlvdKPbB9mmnnXYaa7ul20K9LNq0vaIl7QEHHHBT2sFKbklLkC1lEiMEEEAAAQQQQAABBBBAoL0LeHAg+mdT5bbgqYrRCflmm232H1WKexpWBCHaO1xr2/9McKOL+rj6l9JfLbihp2h6sCOVB9vFUoMbbSbIlvLVj4urrrpqpwUWWCBamuUfChGt/dQKdNLTTz/9u+wyabrOURxHypdF11tvPQ/mxfGmhT3YpJaknh8nnXSSPfXUhrKCeTMWqZy/UQYtReqH7VqNrAVbQYBNZdBb1CrA+eVrr702wOYNK5uuwIEgWwVmCklCAAEEEEAAAQQQQAABBJpdICq9GvfYYost3lQCLPBS4+1xxx133KiUwFZd0W925ArYYCafO+29995+G2QE1CzP7RUBHj3w4oMJEyYsZskuI7jRpoJs4WUG0dKs2CtaX2277bYvav76PvXSbwEdM2bM5mpZOEmby9XUL5kexDA5E8xza0tbKxz83GGtJBdaaKEIJOaDl9Gq0vphe/LJJ9dK+1fp+0uQrRUWRJKMAAIIIIAAAggggAACCNQmYBVXq+jFq9y+m7ySeMMNN2y52GKLecV31llnzVd84xZCrT93zjnnHJ4SQaAtQbSSkefXpZdeuoc9HVNpnpby1fM7WmatvPLKP//73/9esR557GWoLdwuGvkZgTaN51Ig7Vl9ng9E2rS9FBDzgLQC0GdrPjOuz5NAPW8U0DzN1qnbRgtakyq459tYf/31x3/00Ud9NE85wU+bvSKGCNjKaSE9OOJLJargNlx7r/OOt2pTP2xnp0S3hvOMl33tHw8+qIiSRiIQQAABBBBAAAEEEEAAgfoL1BZQq+3z2rbkFcW//e1vB2oGCyBUpYcfeDAhbuFSR+zfvfnmm8vYSqLSbNMMlSsQ+fT111/3W2ONNX5QSqs95EIBNw9unHHGGSPSnpQb3GhzQbasw3333TdETwL1B4RkW5qpD0M7PqarBVZu9OjRO6Rl3CJN1znKBPPmGTZs2DNawIJ5BbdQxnvdYnlNmr8+wbw609JUM2T2cW61pPQ+6BTYLWgxGy0DdSvz65p/DktLLNdU6Wqk9RJkayRIVoMAAggggAACCCCAAAIItJRAPoh20UUX7bDrrrtepcrrJfvuu+9FL7/8sgfBlLD8PHUlMiqzGs++2267Par5q1X01QLKK/76/+Oaz4MwsVxd6+f/LSMQ+aPxfCojD1q+Fj8tMzqZ33777Z9KqaxPAKetBtmMxPft5JNPPsP8rJ+0bAA6WgGqddb4Tz/99De2QAQ2bbrEwbdx//33r7/ccst5MC/bmjRtr0rB7twVV1yxc1qnL1Pi+lt6Nk9rCuLaAzZqNNRDVr4cN27cb1NiSz5/tfDO+b4pz2nJ1sIZweYRQAABBBBAAAEEEEAAgbIFMoGTedVB/ehFF13UW5tpRT7eeOONP/3www+XSisuuUVSZr3zDx061Ptni366bN1R0bdpdcR+Vqw/lkvvGVWWgOe/br+z/vRyanFV0EIqEyD66JVXXlk2Jb0+wQ0PNLSl20UjG6N8a9xljz328P7sigOVcnTXgw8++Oq0XMnHXWxH4wjWnKTpnFrJFQSilHf+QADdNvr5Bx980N+Wq0cwzxZr7sEtHn744XVWXHHFidq43RZa4+3odjtzSpxbNHdC67m9yDeCbPUEZDEEEEAAAQQQQAABBBBAoCUFvFI3atSofZUIv11Nt1pNUcV/qlqbeSuYzTff/A0FBXpYIsusiPu6b7zxxq369Onj61ZlP18hjlvlFl544dw999yzSUJoTRXilOR2MfJg2bXXXrtN//79PQgU+ae9tyCO5+t8882Xu/nmm7dsYF56GWiLQTZziWNIx1SvddZZx58EGrdQm2VRAPrkZFlWoC0TzJt7zz33vNPWWxzMs2PcPj/wwAOvi23Ecul9RY0ibRrPvsMOO/xDiavWQlYBN79t9Oijj75A83XWPPVpSdmS++1lX2WEIFtL5gLbRgABBBBAAAEEEEAAAQTqIZBvZbTXXnvdq+VzcRunTdtLrWq84/Tjjz/+nLT+sir7WsYrjar0XmLri4q9Taf33qJGT6F8Z/z48d6iRp/n06VphhYWiKCQPSX0d7/73Y9KTkE/bPZet+x5cGPEiBFnpGBIQ4IbbTrIlrLTjyO7XbNbt252LExPfbLFcefHxfLLLz9JT8b8XXaZNF3nKPJN+bHoeuut940WKHg4gAXzIt/S7au2znKP7zrT0RgzpDLlqzrkkEOu10S1c0k8yVj9sL2m+VtTP2xZIoJsWQ2mEUAAAQQQQAABBBBAAIHWIhAV1x9//HF+9V/0ldKdb5Fk0+m9BwB69+6dU4ftG6V984pgmp7pKLah8QJqffKkrTOecGjT9op+vNQ/22NpZQ0J0KRVMGoMgUz+dRo+fPh9WmdNwQ1vEaX8HZeZvyGB0jYfZAsny6P99tvv9pm56mmkL2r+WW3e7HL2voTBg2b2IIWePXv6sRytDrWsBdG9BeIKK6ww+R//+McaaX2VGGjzMnH99ddv3aNHD9+PbEtK3f7q+zFw4MCpditpBe9HXVlGkK0uIf6PAAIIIIAAAggggAACCFSiQFTYP/nkk24rrbSS37aWrYArzR4Ei7621D/b29EZu/5XchAlWtS89957y6yyyiqTbL1q0eYtdWw6bo+zljx//etfj9RnNlRiRX9GytrXX6/0W/9W9tRL7fq0bIuryMdVV131f88999zKiaahedfmg2zmFMeFjsOF11577W/1UbUAtKy9haDmPb0+tnGM27K6LfRm20Zxa9J4EufWW2/9suafzebNLmfvW3JQkNHLw2OPPba6goHeD1uck5QuP3+Ek1pS/jWlteTzU0vuWw3bJshWAwofIYAAAggggAACCCCAAAIVLxAV6R9++KHbyiuvXGuQTTuSb22Wnipp+9Yxli9xRz3wcuGFFx6QHq5QY7BGLeomfPTRRwPSOhsarCkxacxWi4BX+O+8885N1A+bB3uixZDmt1sNLejmn+tJjyekdTRGnrWLIFvy8mCQ+rHbYskll/zVXGtqoaWnhP76wgsvxJMy3SctX+cojlON59RTX5+xbeghJN760KbtpW16Ph5zzDHnaj5bf0W0Js2kfS61lBxraY2gYKQ9goYHHHDATfrMhopI+4yklP3X81ZBVfpkK5uOBRBAAAEEEEAAAQQQQACBFhSICmwpQbZobaZbPXPnnHPO4SnZJQdU0rY8oKD+2S7T8ha48/7ebNpe8fTRzTbb7C3Nv5BtQ5XNkrdh8zM0jkCUDY27bbPNNi9prdWCGyoLHqg54ogjLk1bbay8ak9BNqOLwMoZ5qygUcFxEbdXDxkyRA1JP/2NLVCP48Lz5qGHHhqkWyo9mJd9KmdqnTjdAqfWT5xtQ4Ona8Zki/31dJ9++uknKQX2RNsCG733FrHqc+7L1157zYPz9bBpsZ2rYcNRFgiy1YDDRwgggAACCCCAAAIIIIBAxQpEIKWUIJt2In+L55prrvnfN998cxnbsXIqtLE9jRfcYost3rB1RmflNm0v3QbmgZtjjz32XL23obECNzPWxt9SBdxdD7ywfLDbGAuCGxEQ1QMrPrAHIthKyykLdSTCAw1t9emixfueOS66DBs2bJz+Xy2gGS3P1On/NWn5+rTWctdTTjnlVNuGAmtTU/A8jj0PWK2//vqff/DBB/4QkkbM05TsskYelL/rrrt+v8wyy/xiac628kstKT3Nl1xyye5pzZUQGCxrJ4tmJshWBMJbBBBAAAEEEEAAAQQQQKBVCETlvtQgm3Yq//TR3Xff/ZHYyVhPvK9j7JXIG264YcvFF1/cK/fZFjXZivPZZ599RFoXgbY6UBv53+593XXXbdu3b18Peiog4x3LazsWCPXAhm4x/vmNN95YoQnyyMtIewmyJT/f5/vvv3/9ZZdd1luahbOZR0tStXLLXX311Ttml0nTdY7iONV4Hj1N+A5br9bnt4nadHrv+a3+265LKyz3tvC0WMNGEdxTWhcaPHjw15a2COzatL103vC0qpycr/k62xZjH226lQ4E2VppxpFsBBBAAAEEEEAAAQQQaOcCUSEtJ8hmlX29PMiiW7iOT4TldjLuFcnzzjvvAC1vFeaqFFzzyrNaTfn61WJuwiuvvLKsbSMq3TbN0HQC4fz111/3U/94/9OWrBWb54dNW/4rrzy4MXLkyBNTSho7CNoeg2xG6fttTwLt1q2bHQvT022cflzErZFrrbXWZy+++OJKyb6sYy/yV8f+ouuuu+43Wke1/FUee+DtpJNOOjVto7HzN6225lGcl+y/Bx10kPWzVu1hDfFE4i233PI1zT+7zZtdzt630oEgWyvNOJKNAAIIIIAAAggggAAC7VwgKqXlBNlElr9lq1evXjndyrVRYvTKYSmksV2NZ9ODFJ6wdcbtcDZtry5dunggZ7fddns81hnLxXvGjSsQvhp33WWXXR7S2i0A4/lg0/aKTufVCf04zefBl1iuEVPTLoNs4Wjj/fbb7zbzjtuni/31xM1/ab5ZzTyWs+kSB883C+YtsMACEczLtlT0aXvYwuOPP75GWmdzBto8/9XadZsePXp4ucveJhrBRgWBvxw3blw8DKI501cic71mI8hWLzYWQgABBBBAAAEEEEAAAQRaWCAq53UF2az1kpJa8IrbzNJDCnrarkQrmVJ2K+b9/vvvFx86dOh/bP3Z28Fsm3pFi7loMVWffqhKSQ7zzBDwCv5xxx33V8uPuB3Ppu0Vty8OGjToQ/XJ5y0M9XlZLak0fylDuwyyGUwcFxMnTuyllmbf6aN8X4g2bS8FnDzwefLJJ9uDEmwoK8AUx70tuP/++9+qUbWWYhFM1UMvXtb8zdlSzPflscceW3v55ZefaGmLcmfT6VzkLe0uv/zy3fWZDV5eZky2+r8E2Vp9FrIDCCCAAAIIIIAAAggg0C4ForJdV5BNONNV0S24pVOf5Sv76hz/nARYVmVfy3iF0vpnU99fFkCw2+PyLWqi9crCCy9sLeZ+n7bRlirUaZcqYuR5N2bMmE2XWmopC25OD39N2y2ilj/TrOXTjTfeuFVKcVPlha+3nfXJlkh95IHLm2++eYt026g9pCB/XKglV76l2bPPPrtaWrCsYy+CeToH9FxnnXW8zzO1WvTgldbnwTxt098rmHdmfbaRlil5FOcjC+qppeQ/LR0R7LNpe0WLV/UZd6Pms31ua4F3L/vKH54uqsxlQAABBBBAAAEEEEAAAQRajUBUausIsk23zta1U/aanu07LfUX5a3NRo0adVja8bIq+1rGK5VHH330JbYNbavg9sRoMbfhhhu+qyceLpm20RStp9Kq298oyoHGXdTH1b8sH7KtCu193DZ6xBFHXJyEmrJD/HYdZEv54WVct43eaP7Fx0UExPQk0E9/+eWXRSxPInCW8qeUkR+rt95661AFVidpgfyt4DYdwbyBAwdOfuaZZ1ZPK/S8KWXl5cwTZdCWOfjgg2/QqKZ99nPNeuut98U777yzlM1bj322xSp5IMhWyblD2hBAAAEEEEAAAQQQQACB2gSiYltbkE23C3qlVreEPnHYYYddpvV4oC17+6gq+z6POmP/7j//+c/Stq1yKr6RBo0XUOuVJ20bEVhL28u3Zsn0z9bWWq8YW4sMGf9Oe++99z1KRD6gZtP2ioDbxhtv/L4COgtbQsvJY5u/zKFdB9nMKpMvc6n/tXH2UeSDTaf3HpBW4PNvaf76HBdufcopp5xq61SL1SmxfhtngnmfKcjdX581Vd57wM+eaLvIIov4eSbbkjICfssss8zUf/7zn2taOjQ0ScBvxqpb7G97CLJ5ObUyO7NXi+UAG25ygZnle/xPiWi1P6bZPth3pI2bHJMNIIAAAggggAACCFSOQFwA1hZkU8XWK/Fq3WStzDooCDZWo/wtWzZtr3hIwe677/6o3vsQ6473MxtHwMaCdKuuuqr3w6Rte/BOy3k/TArsVVnLubPOOuuotK5yW8zNLAnt+X/ueNFFF+2lJzZafk7LtlZUwNPzYeWVV/75jTfeWKGZ7Nt9kC3rfO+99w621mT6zPrJy982Gv2T6ZbK3NVXX71jWqaswFMcpxrPo+P7adtGbbdoqoXZdWn++gTzUvKqj+L417oXUsu8rywNEby3aXtF/4AnnHDC2WkNbfX4bzNBNisrKW8trzrrZftWTr5ZgMKW8WVtXfZKZVAfM1SyQOR/KgP5fFSayykDNq8t26mV5H+kN5s1lv6KDLZZHmVf2US35unsPhVPN/V+2fa0DS+zGsd0qzxv2b7EcZf2Kc7jtn9xHMc+dkr7rn+1jyFbtsJJP4p2yr50p0D+3GXzxDLtQ4i9RAABBNqpQHwh1hZki4qtvjCuMyLN30MPKXjLJrOtalJl34Mxp59++vGJs9yLSv/CPu+88w6w9etV0AdcBHv0RMEJ0WJO88SXfNoko3IE7Avf5v/6669/I9cfNWmtCPPBzeiHzT4fOXJk5GtzmNsFXId23Ceb7X4MbqG8Ok0fWN9sU7MtSSMYreDUZ++///4StlDka6ygrrFdENo8Dz744HoK5vltozU9bEAty3JXXnnlLml9vkxd667r/3EO0nju4cOH+xNVi1uyKvjrwf4//OEP/9Z8s9k6Y7m61t8K/x/5Pdx2U8dgwe3z9lnRq0oByZz6xTza9jXy0qabc7D8SOXOzg9WEZvp+f+tt95a+JFHHuk9duzYXsUv+9z+X0f6bTteeWnDZaEOgsr6dw1loNYEat659XCTxYrz3t634vzPfzd++OGHPR944IHFtZ9zZRDy/8981pKTNZ3DW1UwKMpcOvfY/sRrZq42z0zPTzNbuI7/1ZXHTbXdOpJV97/DUnPaPkQwre4Fq89Rl0H1JVrBJxkfKz8N8Ym9NScvr1Z+7WXbiH8yRgCB+gvYAcqAQKsQUEXPAi8dVLn/5vrrrx+hJ0ve/vHHH3e0lmXTpk2zX0I7qAI+S1VVVYeLL774DD2k4P/U+u0JLWJfIL6sLT+zQeuwFmsdDj300Mv+/e9/b37ttdduYg9bmDRpkh8rv/76a0cF9qY9//zz3Q4//PA7dNviEFW+v0xfTta6h6EMgRncs0zXeL5dd93173Kd1wJscrY880F5WjVlypTORx555KWqxI/Uh3YR4PmUZmHUxALinm7HhR4+cNann346cPTo0X/M5pPyp6MdJ6qcLqoAtT2Fd3cdEx6ESsG4OlN422232THaadNNN/2nju/ddGv4mO+++26W7PGtYN4s2lYHbf8vKitvKShrfffZBaEFfeo9KI1W3qrOOOOMIxXA20bnmqrJkyfnvx+13ek61juvvfbaX+mpt8M1/xTN31Fjjvl6qzfOgnYq0G3GHlxTfsRDM2zlnjevv/56bz0lt/OLL774O5WZtaylrMpQV83bY5999lnp22+/nS91SVCQIM3TaaGFFvphr732ekbzfqPyMH3BBRf87xprrPGEHgTyuW4nnqTbhr+0hays20uDV+zS+alBZdJWxlCaQKYMKKtmPA08LWnfLXM8/PDDC80777zz3HHHHVt/8803C+g7vNPUqVMXHDZsWO/XXnttRZ1jql0f6P+d9ICdH/fcc097svE3Oif8orIzQfn/eNeuXcerbExSy+ovbDtF+W/XIna+bIn8t3Ph9IceemgNXf/srbK7oa6RFllppZVe0o9FD/71r389T+myH7KsnLboucvyLBlN0/Ssjz/+uAe0N9hgg6/0+RS9yvr+0P4022BpT+ccD0YorVZ+quW35ptT+7Vg6nLA06fr047axwla5ueU4AZ/fxXtuJcBbXuBESNG7DJ+/PiVta0uKr//VTl46KCDDro7pbext1uUjNLfmqfNrXTFd2qUTUm+71IAAEAASURBVB/rh7seKsfz/Pzzzwv+3//935CPPvqop+5csXk76by8oK7/u+oYth/mvtUPdC8eddRRN+p/5lsx+2j7V5/BbDTYonaNYucVMykoa5pn9qeeeqqHzaRhDl2rzKoA+6Iz3urCRnWi6dOnd9J31jeLLbbYTzq32TV21UYbbfSz1vd9zJe+w/x8ps9se1q1J8BmKdimfcCAAAIIIFDhAnYOtyTW1ZJt++23vzrtirciUdDlMr3P6cLXKrz2BeCvaIGy+eabv61197Rl9OVR8q9akR6Nu2kdb9h6i29dU0DBW3Ycc8wxf7P1ayh5/TNm528ScDcFz87Ve+vkvqDFTLRk0sXAhxMmTFjMliknL9M26jvyQB8t2WbwhbsCFr3WXXfdb/Vpwe2Uulizq0EPcmje0xJ6WcdFHHu27AEHHDDGthHHmk3bK47FbbbZxlqUza7PGtqizPNZLVrWXn755b0FXfZ2WFVObLteibrssst2s+1p8GVmTLbJv75/ysfh2ruKbMmWykpBPuizWVUJ6/v3v/99mIL2F6tV4h16au23CoZN6dWrl5cf25+GvJZddtlptj4dA18qSHeNKnSnKoizgh6CsUhRSbCyT6uAIpTGemv5n85J+WC4rVufz/Hcc8/1ufTSS7fZd999L9Lt508svfTSU5Vvv9q/G/pS3k/Xuqao/9dv1H/odfqx7QydO1Z65ZVX8pVaS4eG5s5/v47SjxXbKhD4k7ZfbV+32mqrl/X/jTx1MwIQabJ5R/Fdorya/dRTTz1Mwc5/yHSSHnwzWef1sfqRZQv9z6/zlDLfr+ZNYfWtZcpbwTnH5rQWgwqm9bvzzjvX0MOzTlSXJZeo7F2+4447PqPyMkmBn1/stdxyy/285JJLTrEHO+na8RStc4G0pcbaR/++ffTRR9fbZJNN3te6C8qAfZfpnHintju3bdf2KW2/RUZp+9U8X3rppcWuueaaoer/+O/777//JUOGDPnYjmH5Vem7uWCfbDeyLwXAc3/84x/fVBn6Y9qpFt3H+sAmF8vLajZW1vQ09wHqsuJPO+2009/1HXTpzjvv/A/ZTFQZm6jxr/b9pOMpV8OrSv/71ebt37//5C222OJN+w7ba6+9Lpbz2ffdd98aTzzxxOLafteidJuht9jWuNV5Fu0LbxFAAIH2I5C+UMoJsvlFtZbroYchRBAsWjD4F65+1fJgjVqdjEqS5VZ2/GLlpptu+uPiiy/u66yt4n322WcfEdtoP7nWKHvqX9bWyXzfvn09v9IvvpGH/ovd/PPPn7N8SFusdtHRKCmpeSW+LYJsBTh+XKi1145q1WP5NF3HWvyyagExD0atsMIKv6pVWzwJ1JcpWMtM3mQqYIsMGjQognkFx7fKiZeXk0466S9pVWVtIzYf5x6N51dF7//0ecEt6PZex71vW+XgfM1nZcL7D4p1tNGxl/1KC7Kl/LK8zue3PptdlcoVjz322D/rh5gHVYGY2rt3bz+HaL7seLqC+FMskK9bW6daVwN2vlHFs9aX/d8euqEfbqamYG9BOYz1KzhQpbL6lSqw1yjAt51ajxQHXKKC0kaLS/PtVqYM5Deqz+awMqCK5ym6VfkpBcunxPd25FEaV1kZsPxM+Wp9f5aU/7aMfkTw807ROnOW/xbMVf5ff/755++oVjfFtxk3dT9RfjxYcGW11Vbz/mQVbJhs5VdptiezV+nHyMmWbmspppYuHhCOc60+b7Yhtqk8s7sBbtWGs8eoT+s7JacfWW7RPPNYwlKeN1sasxtK2y647tBnnfTgm6X1nXCCAhSXKwj0aQSBZF5tf2wXanrph4BnrZsM21642HQ9By8D48aN+61aXHu3G/ru8nOd5b/Ku/0Y7ecvPS38du1DXEc3d9AkguPZc3hHPTl8qRNPPPEYBYxuU4u7if369avRzPYhex634zgdyza249OPUbVy/7kRbeuZJaUvlsqZmRSUtZ9++qn7Pffcs5Za1P5N55ebNtxww08GDBhgx3NtPrV9nr9O0zZqnMeCc7ZudYnxsgXvzjzzzP3UirB30V54wC2lt+hfvEUAAQQQqCiBOFmX0ZLNvoT8i8h+8YyL6WwQzC7SNM90a71w9913b5x2uODLqwQEnz/TP1tBZ/z6QveAwpprrjlBt64ua+trhAulEpLV+mcJJ10E9dOv7v/THhW0irL3qvz4BaECKaenMtLcF4Oe/wTZ/n95i2PVPrFKkOWTVT5tHK9oaabK7r80/6z6vD6VJM/rW265ZTPdsuXrzgbzdJHtF4z65XayLs4jmFfW8Z3dlwMPPPBmS2YN++JlUC1AXtX8jdFqzjhaw+CWOk4roiVbyquC/FUgo68Ca8epnD2nCq6fiwUb5XC6gmJTrPKVCaTF/+o9ttaaEZSx9SpQZ2W/IPDWs2fPnD04wwJuF1544fZKe/dMhtPnTQajnMmayoBakC2nFkEnKbj6lFptFJcBO54toGb9qnogzfJP26z3q6b812cF+W8/Pijg9o0F3HRb+2Zx3kj76vlfzn7XNW9ysXPsfGrB85rtnwJsBedk+8xeKq8eaNNxfWpabz7Qkd436SiT1nkUYLvT0qSXB7wtj2TpQW195qa6JbNF0mkI6Rol76O0d1YLyaV1PTJCP8g8YYFcXXPWVJY8KG8Bn2zZizJoY/tcL88LtdZ6SuvuZtsMH5suZ4jlNJ5nu+228x+LVAYK7vDQ+nJ2ztK4qkePHjmVzW3SNvL7WM426zmvbSt/Haf09pTzQWrx97h+mJtc7Bk/iOjzfDC8rmPY/q9bSX3fZXtvpDOM4n2ljFO6Cr7b9Nn86qrm99aKz+7i0C2eNZWzafYdp3LkPxhky1eatu+qeNn5L//dFfPaj6KpnE7V9VW1c8Z8882X+93vfvfDHnvscYduNd9PrbX7FrnF+Syfp0X/5y0CCCCAQEsKxJdfmUE2S7J/MSkIdpCm7UuoIAhmXyD2ub6k3v7ggw/6a9qGkr8MIl0az6Yv68e0rAWCCr6I4omm+v/jvnabqYWb4Ec6KnUcPhp31q9z9xuZXSjYOF4RqLHbLTLzl5x3jbTvXr4IshVqZvJjTlVux1meWaugyDsb62Le3ysIck6avz6tvzy/daF5na2zuIxYAMU+Vwuiz9R3Wy9NR8XIJksZPH9vuOGGbVKrvGkpOO/lUOcPD+SpZdQUu5U0rbA5KySl7ENTzeM2qgC1aJAtlR1Pi+2o3s9utxHZbXq6XfMb+yheFuxQGYmASv7z+H9Tja1SZ5UWq8Cm74d8iwH7kUcBl0+sL0ndAjVAacgPqRKff89EzQI1lIFZdVveYN0Geo+C7H4O0JKe38oHb9WSKpHNUgay+Z+Crvn8X3jhhXO6/fF5u4Xwyy+/7JPZw3Jb1mcWLZyMh4xccsklG9v29N8CE73PO8Q10cYbb/y+XFvilkE/f15wwQV7p3R5EDybRpvWcezXbgpWf60HTPXTZ812XZXKW/48b63+FFg7VOVtrMpbceDKW0/ZD7wRuLDyULw/Nb23+bSfvr7TTjvtONtHDfntznhb2t84l+hW4EEpIDOttnTE96YFprWvfm5N+1zaxuoxV0pf/vpNfWP2VwD1z2oB+JlWl/Vyz7As+l92vplOp2BiTvllLeoHWpKbeh9tG+UMxeXMlrUWa/rB7+86Pj9cdNFFC/ZRZcxbJSrw6AHH2vJXqylYrpz34Z6Cb1Y28z9c6Jo8Z7eh61bo29XCbZ+i1trROlGLMCCAAAIIVIxAfPmVG2SL5TSeXc3uH9cOVQuCqUm1B2/0xfBo2uGyKvtx8WJBOnVy7P01xQWgbc++6PTyLyJdKI2IbaQxo5oF/MJOlYI90y+XBcHR8F111VV/euGFF1ZMq6jXxWfNmy/5U08nQbYavTw/7r///vXtQlZzxK/kfoEXLUnt+Ljqqqu2S2vIB0tqXGPRh+n4tuN1TrUceNq2kSqx+YvIeK+HJFyg+SxNJR3fUTFVX1rrqEWC314VFVDbjqVb++CV1cwtqflKQlFS2+Jbzyud/1okyJbyPn/M6/3s6g9vR5WD51MgwcuABXN1vvAnQFueWd619MvSYZXuVDbzlRTdwvW9gs7nWqVP+9M5FZpoCdAWy1Bj7JMf07Yimc1qrW/0w8vT2f715J0PrFVCGbA01BRwVYv3L9Tq7mw9gMMr/QmnwcG2OJfpoS2760c/K/+1BtmiBbACv99Z30uWhrjGSelp6pEf01tvvXVcr9WaVlX4/dpNwZhDU6LK+v4od0eKzzlffPHF4jr3j9SPOF9oXfnzipU3HdsezG9oebOAia17vfXWe9fOcZbmlA6bLGdwVz2wy/u2je8urSCf7piOAJRup/xa25rPNlLPbdqiMx3SevPncX3frqZr8Zut1ZoW9LQpn5vk+FXeePlRi8nDUyLjnDvTNDf1P4tN9H5+9Ut4gG6TfdRuOw8XG+u7baqVEe1LPnCf/X9TT1v5Vlmq9l3WvXv3nG5L//6QQw4Z9fLLLy+jdMRAsC0kGCOAAAKVIBBf8OUG2SztcYGo2zWXURDMv7gjSKN/e2VZY/u1NNeAvtO8cq1gwU66NdW+7Ar6oYqLFqv86Ylev9f/bWjSC8IZm2iVf/2CS7+4/n6JJZbwC4q48NfeeNN2jf1zVRqOSXuYv0hr5j32PCTIVqt6BGJO0xzWH1vBr/wRtBo8ePDn6tdjCVtLHK+1rrH6Pzzv1SHvILUoq/ZQglTJsUBL7vLLL98lLT7TYy/ONxrPrQr7P7VM/mEKNm2veJiKflW+Ma2zpOBdmrctjCJvmz3Ili0jyqOOEVyz2zAtb/Tyi/4476bP4n8VNbbyqYDbNJ3j8i11f/Ob3+TUOvN6PaX3N5mC0tR9dmU2VfmT6RjNn/drCq6l4Go8xbOi8j3KpOW/pTOb/9Y9goJto9T6tncmJ/L7mvmspMkIsqm15JF6gqo5FFTU9T5vE9+1CupMeOSRR/raBrLHm71vqiFz3p1VD5R6WdvJt1iz6eKXjhvfD1XkLXBkw0zP6zNmqfff/Lr15Mo+FlyzVnRam6fLglbWAsxa+qTvnGrpjXnLGdu5weZXAPYz+cyr6foGvDz9ejL3Q7aKbHmz99lXbFNB//HapndwH3mj+RplSOvLl2lrDajrqPOLg+NxjaCNFqSxMd4rnyoqyFZsovfzn3XWWQfrTpt3svur80UE1hrdJLudcqet3NcUcFP/eb8cfPDBN+jBH7/VOmNo8I8HsSLGCCCAAAINEIgv+PoE2dJmPQh2xRVX7KpHVPsvPvZloP/5l5S+tPxCRhe3333++edLpWXyFwAlJt3n120fF9t6dXGQrzTZe7uQtrGaeb9bn1tTS0xDq54t8lnjLvaUM/OK20Jt2l52gWFjPbHPnG0oN59mLNU4f/3ClSBbzZjZ/IyWZsX5GceJLsKuTfPXJ1jl+aCWon9WSuxCzzogz1+AqkLhx7e1OHj77beXtNTWUXH0MqUg7sm2PqWxIDgYt9OoIvqNjuVS1mebbGuDm8ux2YJsqXx43tj0mDFjNlYQ9NFMcM36j6nK5r3Q8+Wg0qctwKHAYD4AoqdTfq9gy3nvvffebzKFpyXPd5lktMxktgxYCh566KG1d9lllwcylfNWWwYU3LB+AvPXDboe+UoPZjpF+9wladcr0BpBNj304bBygmz33ntviwTZdE7tqgdWvad9nmmQLY4VBdnOC580bsyRHW9+/WhdDhQH15RnHvDQPE1ynomAlx5G8aHKQUNu3/Xztfrku9vSqvXmzzPFaY9t6vxjgb1GD7Jlv3tt/aeffvqfdFtoPmCpc7j1/9WowcrifYwfYKyVvR4E0eK3ixaZdC8OrmVa8zVJOSv2aeh7+w4247het/Up2DZVx+pV6rct6lj6uEWv3237DAgggED7FtAXsV/kNCDIZoBeOTnyyCMv03S+JYpN28ua99tYv6C+qe311HSH7BefvZ/ZEGnUuLv65nhC8+YDazZtr7h1zZp9p3XVJ6CQFm1bo/Czvdprr738QtAutvQ2f1EReWT9xcSv/OXkUROI+YUrQbaZyrqRVYbjtlFVJD3oZXmbAiJ+O5+1BE1r8mVmutbMP6PsaDyPys7ttt4Iatt0eu9l6aCDDro+LVrbL6l+nrj99ts3VWf5v9iycUFu09HSQ52oT23nrVI9j3T8NUuQLXuc28NQ9PS7m3U+iHNDqw2sWJkqflkFU+UsXwlWi5IvR4wYcbzK95ya14Z6BVtmLNp6/8Zxbnug6YVVJk5dccUVf7a3erWZMqAgh3d8n/bL+mx7SX3Mbaj3MZQVaI0gm1qyHd4agmzK2y4Ksr2rnS0pyKZbIP+WYMr63gjMmsaprPn6NN1ZP7gcqpZrH2teP16VR00aXIvt6PZev/tC+3h+SmdZeZ+WsZHvi54KeY+m7Xssf36x99lXUZCtsW8XzadfZXoTDW/Hti1omv3xOz5v7LECVtZtjP9wpr6S79P6fUh5Hm+bZZwtZ7ZBXVNsNHTo0Dc16XliJtnrpfi8NY3t+il7La87in5U9x3nad8X0n7YUNu12Iz/8hcBBBBAoOkE4suvIUG2WIfGPbbYYgv/ElOrmoILDV14eEVcvx6PSnuTvyAoZe+iIqiOeJdWf2E19uOk9VTpIianJ/EcXZ9tlJKOVjqPW1s/bLqo8EqTXQxpX/wVFxqrrLLK/15//fXlK8TOL1wJstVZ4tzp6quvHjb//PNbftrt1Pm81XHnQTf75Vz9Ea2U1uaB9TrXnGaIY0/H9yJqYea/iuvCriCYZ78Ga/actUZIixUc35l1LKRWb95pfgR2bTl7WeXKxgp6/LWmdaTP2sPI81RmzRFk83xS3nayQKz6i/qv5YFedltok7VcswCwyky+w/Lappuq5ZzKWkHLJnVE/twDDzywbipc7a1vm3wZuO6667YdPHjw+FQGvLVzY+aBfe9EXquCaLfyTrOgvZW17EvfSfZdbg9DyZeRxkyHrVvb9WCAAv6T1RJtlI6BeVL+lxxobW1BNv2ANq+CbP+x/NX+58/hkd8xtgCETTdBSzYra/798/TTT6+i/nyfiG3a+V/lIX8XRHzeFGMFRP27Rj/oTLnjjjv8uI/vKG2v3MHP1y0cZItjuIf6njy/d+/e/p3amIGk4nO2HZu6DvBbedMxbKbuqlbQr02aNGkxg9RxVdb1Rrn4tcxv2/TtvvrqqwP1kK+H+vXr5yZKd6sPrhlr9pWCbfk6l4KJ7+o2/+0zNl4+Mu+ZRAABBBBoaoH4AmxIkC2l0S809LTALeOR11aR0f/ii83G0+3WE/uVLbtMmi5l5F8UeqLpAemC21vpaEHfRlw06rHX33/88cdLpxW26y+XuHBUC5XfqLPdn8wqgmo2nS6c/MtZvyifUEFmXp4IsqUcqWUUx6/9W31N3aqRVZ78Qtem7RW3karVxsuafzZ9Vp8LXz+O7MJtoYUW8mPZLrJjGypTPq0HGUxRp95r2jY0+DKRRo3nGj58+G36vNY0qlPuVzXfHLZwLGfT7Wzwst+UQbZk6/nzySefWOu1MeoLz8uLKroF51XZ++f1GUfFLCpkKidTrTKtddVawc9sx8qU96llv9bbeSsCNJl56p02W4cFefTyYItabv0i85GymVX/s6E9fHd4WdM+d1JL9Eu6deuWLwPZ729Z1MvZ8ivyXs6l5ntt27IKfb4cpGuA2uYt6fM4N9r+6dzzr2yrtlLOPwTZ7DApeYiy1nHkyJHH23WalvQuCLLXJPZZfV5xrrEyZ+tLASArL1MVhPBXOtb93KOO7nP241RKvactTZc78mVbIsiWPY+ru4blfv/737+f7NwgTdfL0xwjeCNDO0fWec7W/Dm1YHvUWkQnxJYIsOXz8pxzzjlcPzDGk7AbbFLsmS1z5qVz5jRZFfxgED8eWCDSvm/sfGjz2qsxzmHZNFl+aXv+fWZPSFUrzatVRmjVlgojIwQQQKBZBeJCshGCbJZu/3I7//zzD9S0fbEXPLnSLnzsc+tsVI+gXkLTNpT8JRxp1Xg2PSXpYS2bv03UptN7Dxjpl5y31eHrwvqsQwSabLo9DRmvbrqN1jvltS96GeQvuqKSof8/nZm/5DxpQk8vSwTZ6haO8q38W1Qtzbwlkl3YZfPZKhn2vraWZnVtJcqGzafbQm+yddUQzPNtqrL6b82ffVqb56WeVHeCLaeLyxr7dbMnAD7zzDOr2jY0VEIZnJGS5v/rXsrXJmnJlsqL++oJtRvolskJ2kU/X8c5Or3PnyfKeZ8qG3EbS40Vsz59+uT0MI3pCspOHTBgwCRVeCfq5WO1LpmsJ+BVLbPMMtb1QI1pUEVlqp3LrMLSGBWVOA/afh5wwAE3fPnll300bUObvN0mHc9ezvTE1dXVr+Oz2lezbnBF1PLfKppxzknr9Xy01iS6tb1Krcd+VpDlA3Uh8axavTyy7777jrEA/D777HOr3Zauc8g/1aLuFZWDb1Q+flVZyaWnd2bLgwVSLHjSoDKQKqZ+frSyl1q1+e3DcW7VPtQ4EGSrkaXgw2xZsyeWq/Xak5rB81F56u7xvpxxBDjsnGXlQMvWeK4pXqe1+Fa/tK/ecsstm+l/NjT0u8aPo+YOsmXLpvoZO0rH03faF3/wgp0Xbbrcl5nqvDot/RBSsLz1z2nna3siuJ2ztb0J1kLMri0VWLtHryv1gLN9ld/+I5m23aw/UqRy5tvUw9iWVdoejP23cqbzUsH+xP/KGds67Pxm3z3p+qfgOqucdaV5/cE8FhCO4Fs91lFtv9L1n5cBBV7/k23Vli032hYDAm1WoHOb3TN2rF0K6EvOLnY76BaDK3Vr2pZq1TbELoDUbNwvQiZPntxRlaaqRx99dCn1YXKhkH5vUPblaF/udaHZPGneKRrv8N///vdpVRKXVQWp6ueff/bjaeLEiZ3sAl+3/gzQo7n/pHUeri+Vhl5E1ZW0ivy/vOyCY5oqDSOUF5voV7SqX3/9NX/e0UXCdHPT7Xsf6Tbe/VIeaFR3XlTkDrfTRKl828WU5dvn6rB+DwUIbtVt1XOo8pirqqrysq8LQz8G1VLjSN2mc49uC/w/LWOfWcWkzsHKRDr2chdeeOGeOvZ6q5Kytl3M6ZjzMqWy1EnbnKbbb1ZUp/J/0fxHajn73xQ9TW9dBUxPtA3pYrLT1KlWJ/JEd5gyZYqdADroovg4BXxesln0Kildtg6G0gUsKKDyMk15M7sCrqfrYTIHqQWETgVzVCkfOuscXfrKMnNa/lmwQh9NV952nj59egcbL7DAAh3U8tFaIP1PAYxnNd9HmmeyPn9N/ce8q5ZTv2q5/+lz+0FmFi1nZXZOpWUuVZQWVFlefsKECb10jp9DrSN++9Zbbw3UvJ2V5s7TpuWLiFV6bLudtLwV1EzKSpu086DOj7bt6RdffPFOb7zxxkb6ntpWPwj9U9sr+TuqtK217FxxHCsVdqxuoeNytL6vu9v3g0w72fd0uSk0Iy0/XctPl6GVIz/f6CnWHZTXXyiA+pwq7h/r4Uj/VrcEry+44ILfaZ4f1ReX9ftW46B0dvrHP/7RTdcPXdXasrfyfhVNL6HysPy77767on5Em0st1iOt1hfUNJWbTkpDWd/3do60NNt1hMrcbHod8f333/fU9vfRflnXFLYNK9sMZQqksmb5Me3hhx9eXw9VuuGpp55aRGXBWst2/N///pe/Hill1VbOUlmbpuM9p7y2smbr76gnzHfo0aPHVL3voCDum/PNN9+H2sS3FrzQdc8kLZfTMnOoZdM/FEi/X+9/1XK2bPknjFIS27TzxHl8Tl1L/0XH8CG2OX0fT4vv43I2b9cKsppux4+srLx3XHLJJacpIPmzAt3367j7XoG1t9TB/jgFrH6Q43Rr9ar/fWGu2W3pO6WDvmM6puuS7L+abFrlrKPS4UGlUaNGHaag/fH6wW5B5f007dss5ZazbEK13g4qr97yTDZ2XpsljTt07969g5U7fe9M1nYm6v14lbsfZfNfvbcAnH13dJBtTueUBfQ9M4+unRb56aefFtA6Z9e4o85tcQ7zzdpySndHGXu/0rZ8uYPVg2ybKg9T1Wdvf53TbjnzzDOX1K3E52h/Jml9nNPKRWV+BBBAoFwBuwiyZRqpJZt/udr6dFJfVhfTdjL3W3JsbK/0hWy/AlnfaUfqMxsKvmRmfDTTvz6/Kvl/6KMWEZrT+nPyL1ibti8XjafZtrSNw9Ka/KI/TbeHkRvdeuutQ/v372+1UW/6r7F72YWnTduFkgIzf0wglWTkaaElW8qZ0kae57q4Pc3yVseY3zZg0/ayX0ttrIrt+Pfff38JTeePV5sucfBtPPjgg+updYkf37ooLD72/L36ANzJ1qlzzGzxBFS76LOP4hXvDzzwwBvSucgvLG25djx42Vc+DpeBt/yz8UxeFsTKqbLlfVFG65oa/Dzv5NxdlcwxsT4LTsR0uWOrmNmPGlouvw5VzqyMfayg6WgFWw/WDyFLv/zyy4tongYNSncXVZwWu/766wepNeWZagH1oAJ1Pytgk7dRevyWnPQ9k/9cGy5p2paTh5dR3T468fLLL99d2w03/65s0E608MIqU7EvnfUj1Gl2e7fZdO3ateBcUY6XBWg1fz7/FVCbrlY94/RU47N0O94gVSK7lbDbli4PlqRxrYsoPzrpqYWLK2Czo5Wxdddd9zMF7/L5q+82LwNaQf6zUqftOkLl2fNfreXHfvjhh/G0PncrTlQca63lwQfN2SdbpqzNogr+cboe/MXyQf2hTanP8Wl5o5d/h0V+qqzZwyueV1DlIm1jP/2YM1AtM/uojMxbnFc1vK8xT2uYr66P/HzdjC3ZfHuvvPLKsmo99qQSZ+Xc+hjMH4PpszrLv313R3m3ZXStmNNTUl8+/PDD/6In4K6u/sx66fO6Bjtu7WXpKrk/w7pWWsb/45w2m344OkvL+X5b67X6lDNb3pZTWfNWZnqfv76xlrgKLE7Ucf+MWt3+Xf6H6M6dISpzSzz//PM9X3rppehqoMbkq1zOoh85u6lLjcVvvvnm36nc7qHzzChrzfvb3/72OyvPkX4b27lM+eN1mezn5UxbwwbN7/ugVqSPKQ0L6r0Nrf77bMZu8BcBBBCoUAE76VvSGivIlnbTv/TUd9pBem9fGgV9/MTFgH5R/E7BuGVsmbggs+kSB7/QuOCCC/bX/LaNgltTYxvqh2yCBfxsnfXYhi3W6obIU43ntQsm7UD+Ca82bS+rjNr45JNPPi3NX2nBDc9fgmzKpRKHTL7Po6DWM1os3x+bTdsrglqqAF/bgHz3vDnttNP+bOvURWBBBV0tWvxiX63SPtV2TtMFqd+qXFxBiqCfbnH9XC2TltS62s0xavs6k8F9db5qzCCbn5N1m37/PfbYY6y27bcVWcXVpst9WZDeWj7Fcvo1Pzd48OCP1LfbeVdcccUg/WrvT87T/4sH27fOFpyw8/HMXvqBwOb1+dO4eF0dVKlZTOVwr1122eVuBdy8Eq+ZbH+8Q/36VrKibOp7JHfEEUdcoWPF/Sy91RLRSj7Ipt36X0tO1b4b4vOZjc1VNpb/fqyrQpvTk6nfUR9A5+gpfqvp8+LB3PL5HucefVZbRc8+9+8kS3emLPixkV25yvT8F1100faqQN5mD+/R/7w8K40WbCu7fNuPdKkVSm6NNdb40W6pTturtm2CbNmc+P/TUdbsuFEAMh/4iOMq8qiUsQWCUlnzfFXrSLvd8wUdlyMVCPqttjHX/99ywZSVoew5pLPe26uxbwH3ctFMQTbflvU5rPPtx9oXK6tTdT4u6xyeTPM/eNlxo6dSXqXWhqvJszhAaY7m5udsO3bjpc9qO371r2YZ/Hys9CyoFnTXaot+7lc5KzvgaMsWn9fsM/shX+e29yyoph/tt3nuuecsiDvTYJqWMxdLW/alt7UPqqcspLsEBus79Ew9QO6looCbf5/ZuUlrKPtl3/Nxza+g9KvPPvtsnKNbOv9qB+E/CCCAQGsXsC9L24fGDLLFOjWeXb/0PKrV5yv3Nm0v+5XJxvr/Yxr7EMvF+5mNY16NZ4tt6Is1f9GgZfMBBl18PxHriuXifVsbx/5p3Fl93NxrDsUuYa9fzyqtH7ZsdvjFJEG2LElJ0+523333DdLteXY7TLUHXegzq3zmFAzZOa3Rlylp7bbCdM7QeO4ddtjhn/ZRtk8re28X8TaOlyoBBRe9UflVGqfqlrA1NJ8NZaVjxiJt8q87qKI6XHvXGC3ZfH12u5Z+2IjOxgt++LDtlPIqDq6pf61pKgP368eOHVQeuhblhm03XzHTdIMu6K3cWeU9VeCt0lcwqOIwQLfD/Fm3eL6Vad1mHVEXlD0tVNK+ajkrw76sKqCtOtCWCXrMq0DYtWZgQai0jyV5hFvy9ACr9dOk/tPGqU+oXZU/xZXzzrZdyzct25iDl4MU4Co4Z1gZUAu3v6h127faoO+XBYOLz0fxv9rGVtmOHyTUYvcX3XI1JO1AwfYIsiWVzChT1ubSceP9d+rfZbe0Kg4Erbbaaj8qsHa5zmMrq0wVB9byQaAmKnOZPaw26WWiGYJsHlBSq6m11VL4E6XCWgVOtrJq06W8bF47HmJeBde+k+lf3nnnnWixqX/54Mdu5GV8WGFjd//ss8+WtKdpKm1mYE8lLrj2SJ/P1MeCVzqv5X800PVMbsiQIR8rsHaprpM2VHkr/m4zCtt+Z/sBIFPm7FxX2/nO/2fnQ3vZMuqqxcptte8y/X+2a6+9djVrUWjfZ+lhU74Pls76BNss79M+Wn+oVfY0cW3bhqY4R89YM38RQACB9ixgJ3vb/8YMstn6Yr0az68vwDftI1205r/c04WBV2AyT7Ws7cvJVlltiAsA9c8yYNVVV/WAQrRg08z+q5S249tQa4cRaQVlbaPaRiv/A7/w0C/7e+ki1b6Ua2zhpwvWn6wT4rQ7fvFWYbvm+0GQrV654nb25DTr5Flr8Cf8aewXabrI9mNCAZfP1RfTSmkLZZWBqFzq9pw147bRVPn2bdi2rJKkbU3JXtTb53bsx6+qakl5Zn22n5ZpqyPPP53fhpuXrAp+PLDPil4zu13U1/XYY48N0m0u3srHggfp/Fu8nlrf2/xxgW7bttsMFcS/5vbbb48HVehjH7IVjvisqcZeWdHKbR/z53V958ytoN9OasX7YibYNlXlsOzKl5Vh7bt/b6VA22y2M/HdY9OVPkRa5TKvbk96QOn1AFu5rV+s8ioLL4uq3Nttes+q/7pttd5sJdHzX9vI50dT+2j7ti0rA/lzmFr6LKwK6okKtvmDYPQ/v12+3HKvW618f3WOm1hToC3Og9wuOiOXM2Wtq/xvN3e9yg5yhrstr2uV79Vn7JkffPBB/xlbyf/1QFDK//yHLTDh59gmDrL5NtKDavwp8Vkj7XOt5+74Xzr/+blMwbWfdG11jo6TvhkvD/xUgGcmSbVO+rH+xRdfDNhwww3fs33U91O9Hm6QWlf6NZHdDqp8fEYPcNjL+k0r2nonO95TGW/s85t/l6XzSfZ8anWpuc4999xh22+//eN9+/aNfPbWneWez8wp6mG9evXK6Rpxx7SPBNqKMpu3CCCAQIMF4gu1sYNsKWF+YXDjjTdulfpOK6jsWwVG8+XsUdN33333xtllytgx/7KzX2W0HvuirHEbdjuTbmPxBy1oHk9XGdtoLbP6ft12220bpX7Y7FfLfMUy/frlFxPWR0raqXzFpMJ20veFIFv5uRLHtC2pWw9u1Shu7YoLNHtqo1ceddvNi5rfL+qyy5W4Vc+j6667blt1bm7rLjj2bLs1vRQI921bP2xpOxEsSW/b/chddTE/3PwaEGTzYzsF2KyD+Xy+23Spr9QywCtndquW+sG6SefSCNBrNR7caIm+eGzb+SGVX7ezD/V+NvWXs6OeYPmqvbWX3XZWbsXEWu/p5ftvQSqtdx5bfwQUbLpSh0ij0txVab9f6fTyVG6ALSpmtvwmm2zybmq5lq0Mtnj+Wx6k/c2Xgc8//7y3bo09VwHmuKW97FtI41xZU6CNIJupzxiyZU0Btjv0qR1z/tTENF3nOceuCVXWPK/08IIpyrvL9EPQwBlb8L+VGAjy8taEQTZfvwXY9MPYj2ZZ3HK8Lt/sDyTqA+wh688tY9raAiz+vaag9yC16PvG9j2O0bocsv/X95r1debn9cUWWyynOzseUB+cUUcInub80Si26Y0Uis9l9k/14zZId+7ckwm2eZ9t+ledx1Z2njifE2gzVQYEEECgiQRSxaTRW7JlkusXCLqF41J9ZpUcr2DbdHrvX3KbbbbZ20rLQrZcXKzZdImDf+mqT4aLNb//omXjeFnFyqY33XTTd7WNnpquzzZssYodIh817rblllv+SwmtdiGmgJvbKy/MyYZKDbBZ2rzcEGQzivKHOIb0lKle6vPML0Sz/ZRYoEEVGi8P9W1NFmXOUqeO9G/RqNrxbZ9lX9HaTWn6Qi0T6IdNODUMXvaVhw0Jsvk6Ghpg08W4lxEL0Cug8JwC+EMy6Y1bNzMftfxkKpe+/5YavZ/jxBNPPFp9BP5gb/Uqu2N8C0pFsFNPzx4dZT/Gtp1KG7Jp04MiPNiu/SirtYfmt87mvQwoUDVNfSzaU4Ozt05VRHCt2D6d//JlQEHhVdRP5dgILqbWKwXnJq2j1vdRiS8KtEVfcR3ae0u2+L6xshEBNgtghPfMbON/MvbrNHuvW5D/qXNNNuBRyYEgL2dNFGTzdadb/T3Apu4+8k5hV9vYgpbWwsv+r7s9frE+jJVHs+u9DRV57M5IWq1/3cMCbGql+p3mqnada5/N7GXfZWFi86msvaC+0LbQdHaoGJt0Hs+fyyyRaoG2qX4gfdoeXKa3ft1l+2XTpb7iHFgcaNPyDAgggAACjSGQTuBNFmSL9Wu8gPrueVJp9tYENo5XVPbVn865aZ/KCv5kttFd23iipm2oouAXJvpl9Kq0jbbWesbNZHie7X/8GmzT9orghlohfKAnjPU2g7gwtukKHPyigiBbg3LGy8SVV145rKaWZioT3spRledfM/2ilXXsRRnSMbiw+hfxYF78SqqU549xm04Xgb5N9XOya9qzgovHBu1t21nYTWRbryCb+rnzWxqfeuqp1ezpm2YfQQKbLuVllbMIKq255pq/6Hato5THUTYqMrhWnP3peyFfvvT0t/5777333bH/qmR45TPe1zW2gEGYpFtHbd0V+T2S9t3S1jEeclBu0CN9Z/jxqh/BXr7pppui70TtduuooGfLgKY7KRh2pG4/9K4l7EenciqmcQzpVulf1OflRoagwTtAb89Btsx3wLwKsN0pk7JuR7YffOJYHDBgwFR951+ovJrLdVXOYv3pfSWO/BzTBEE2P9/aQw7sCbrmGv3p2nRdr7jms/n0YJiH4iFjet+hFZhaMosH93jvvfeW1bWG3wZejodWZnd22J0c9srpe+3bU0455XCVtTnShmZJLVMb+1bQtPoGj7wVp9bi6bNzm54QPTyuu/R52f2P1hJoy39nNjjFrAABBBBozwJ2orb9b6LbRZ02vtD15biM+oKYpA9rvY3xnHPOOdwXKrOVVWzjo48+sv7Z/Clz2YuMdDHtgTY9Iejo+mwjLVOJI8/Da665ZrvFF1/cK47WAkEJ9QuxmLZfvdTcfGjagUr/IvX0EWSrf3GLY9vWsP/++9+oUbWWZrrtxI8J9a/0sub34Ex2uRK37uVPHQAPVSVpom3HgjQ2zr4i0H3MMcecp214/tZjWyUmqVXP5jY6p9UryGZ7Ltceqlg9a5OqiMStcgX5Yf+r6aWWv14Jsf/pR4uxuk0pf7tW3B6n/7WaIZWx/PlO/dvsFbdd2Q885QRaUqDNj5nUctocKirQlvbXK6T60eV8pa+soIfNH5UvlZ2cHpRwqdbZxXZUQ8W08JiRnNL+pqeT+swPPPDAqmrV/qreWPkvq6P0qNQPHjz4y0mTJi0eW1dLycOtnzpbX1pvtWMrum5QK94JeipmX1s2rltsuimHVCY66Ae2eRUw/Y+2Zd8F+ePc3mdfOi58P9Rq0360syF//Mx4O+NvpF/rn0vlxFtL6j8lt2DTd0K+pZWCVG+OGTNm08z6I6if+agiJ92mkYNs+QCbbon8WHtdVout+KFLt0FOs7tIlD//j70rgbdy3N67c07cKxopUhpoUipDZChkHorwJ0mmTCVkuKZEZYguGVIhpTJ0UQlFlKgIESKlRK6pIlMy5Jyz/8+zzrv2/c45e/r23uecPazv9/v2++3ve8fnHdd611qvSp9mZP9F+QUPHnKgNtj8qswqJnCDOGF7+qpVq5p7WlPY9u35nlaP3nn4k08+aYLNoyf1cAQdu5HhUn060n/1T5VZ0Ac9XUEzCo+0qhzLjCFgCBgCioAuviqSyebSkknynnvuuQT/OfiXMsiPgV53lzZ67EUI8a55jcOVNCgSr0w1LwGladCQLhl+Lj4JE0fcaelFF7nr16/fdb/99hOpFe/imbvEIAxlwQy/w1wh/OJaFWWXSd6YbMlBr/0b7j9hOHcRYgudmsdn3kpQgfl1N/wR90SYBtKPcMDITYwTbbCUlJASp1DNeB9piLqK5g3+7SqNgLR99Ne4mWwkHFB/1zIa4PoPLLrF/lbZeuDnaLcuuGknExJQdyIukdRBmEwlzpD1kkvHSv4j4xBtcQkeZS4ise+eo+JDP8osoZ3RKVOmnIF3vNJpHpG8QPLsZBryRt5CeeZzrFvbDObJv3CwwVnwL5eXsNN3meS68aaAecYzpa6m8JG3d0NO30Vy0UdkbINtwjmIRySuKOmZa0w2hydgCgSchgCxjJvB5tYp0u+A5fOIr75ElnljjYzXqWKyAQfpvzD10BgMpbXAxJcksjKTYD+zkGOAwzTgHf/0XSa4mm/gsfMxxxyz2i8eXANTapXhIOX9O+x0XuApd8bOa67/yXjG8tx2223ndO7cWUwiYDzztXmk6zMcUrfm888/b+XwSac5zVNl9mgIGAKGQIYgoAulimayaTpwt+rbt+9cwBOREIdhz1ccfL6IfW8aNO7KNLDgkMmVz+6/MJwwmdAG3E5MRydxPmfS5SlvAXbm5NQ4JZBQDimv7vbBqOtCLZuG0/9p6srC1ZhsKakdWSyBsXBou3btRFXKy1SgdA5SoXpg0HOsu+Afb+rapuDWgZTHlwhHCaq/SEjBFUkqLHC3wEbYQS5OW8BFBlewx7gUN5MNGAeHDBkygFFComQSnCDq2NcpolCHk3qClNevVDHW7GU6c0XLQde1U2W0bAusxvM1b0f0y7O+i+SqX6ha/4oTdrvCH690aNOSh1dfffVASI0LwaWbS8hf1LKRGCVxRn9gsK2bNm3agSwUrnS2h1WSQx+/3vZ8xRVX3EgJDgTnWiGiZBe/6+3duIKtO0oIB6C2dYGzjyTrC/XrdZU5mw2SbJ7xPu+GG24Y6coZ9ymiGGsEazCBiyFt+QDiq4E4ePmad0qCVPmv5DkVTDYPrtXQtp5EycqZ/uC7SDf6r7Q/mAn4wyOVlLH914sH+upjfvGgRD3WNTKmod9/ADXvDoiDV0aYPCjJavRfYMQxXzbOly5d2uGoo476AP/ZRuLuj/Sv6vDECXHWwzudL/lolyFgCBgChoBfBHQSq2gmG/OlzKwVK1a03HPPPUVt1LuDzMUrblkkQKXzSlcWX4SLlgduHZwq9xHiKCdmr4SEs1/GZHwx81y+0sGRxd0DDzxwHhYTnFRLSQcqtmB6rPHY4/CFZxUWUspmTLaU1YDgCRskwxAjpRtLMWC0rUA15RscSNCCqWp/9ZEDWehNnTr1+P333/9XpqN3/fr1g4jvNhdXprRBH0VPqVepK+AVF5MNRIRIg2BxPAdMo4caN24s/72MVK2HcK5jGgghgp3w/9KWmytNxhJnsWrDy2iBfbUbWrVqJW1VpUDC4VT2ne7+w87l55hvdmSaCfQZBkvJpWkjL9tBJXA1Io3bhhPbAOYQaQOQFvlk/vz5TV2mpC2mJINpFIlixSxBAuR8bD4I0weEZkQmGbyGxjMS7/zfsGHDIFQqH4aU8Gz+B47y3utXn7OJyYYySbsAM/4sV74ixUTLG8nVPtasWbMgJCVlYwB+q7TvMP0kLsEiWSabW7vKWvTGG2+8Hflheyv0amO4d6F26P2vTBKo+C/9+OOPQ8wkFy+8ZtaleDDX6K9D4fjCw/U36dcwnUBJye0dAlk3pjmsdPNoG0iy/8fhVazjjvsftu3oNxVKgKDDy4hTbNW5uB105hgChoAhYAjEjYAOoJXBZHOZEkIchs/7QCVJFqQg+EMLU5UQALH3I+2ruTB+iXLxD2L/BKr0II5S6jJu0VK80047BenHpZFpE6+U8Zlnnjl21113lYWEdzJ1ZSzaYYcdglAZODEDyyj1YUw2V3NJOtrP4W4L1RwxTo2+VoqgxH8hsgcMGDDZJZcwk+XNN9/cA7Zg7gThsaRPnz6z0Aa7I23WqfT/JIuT7cGl7YOwiIvJBjA4xoXGUP6Pl+B144TUOzYlPnj99dcbO3Blwe6es9IBvhxDpT3CFugFkPyS/hAvowVhQ5JfsHk4A+27ytSgPf17KzJavXnjc7Tby2BDX10Icw07w38ABrWzug04zKSvPfbYYz3VXqwygaJhxm/edYvzW6oPlg2v83MWSLIJZgsXLtwPmym/sJy6SVO2zGX/K7YtW7YMjhs37iJ855Wpm5wluXcMx2SZbIhM2+IpwIl91g/jUsZwaCy8/9VXX8kmGcLLGlEzmYGu4PH444+fVK9ePZnj4p3XlI7ggU9gguuBaoRA4sxALOLKsm4ecWzDqfF3IZDgpmOP+x9xPnDrAZkHnWkfppvVmLGAdhkChoAhUCEI6OK8EplsLIdM/jTIimeKKYuaEp9560IMu/GfIH+JSgjIxICjubmQY7xhpbwOO+ywb5ctW7YHvnO3LCMWJVpncGueeOKJ77N8qhbKZ97KMAHGD+A/r4QZJiXBK/1X6s+YbKnDXds32s3OIPQ2IGYaOBcGLZ9JbGORJQssLNBudSkn0idCjDSktR1uW6T5q0bBC/Xlh8lG9dAi9vswxH/YRbWrbyHOIInzFuqprstmVjNXvFWBMrOtShuHetUpODRH5iLMQaF+ge9h8eN7L1GCAxUuc3FXRXuXNEEY9Xf5LTXfRSuDSnaTwQY8arEMSqzxOZsvV/+CHTfcoGb3J8obN9MIfU3mWvY9hot2K6GbyUw2nUMo7Qyp569ZXmVoRCs7vynzGlKjv0+fPv14vOOV6Qw2lkHaT5JMNhmDuBZF+1iLOP3gGo7BVhVjELFI1SV4vPPOOx3RztYj0rjx0DUNN9HvvPPOf2mGtO3q/2x1veW89dZbbyF2uOOWaFMJeKrRk8HpcMr09pSt1W3lMgQMgXRGwC0yK/R00bLl1zTh7tCjR4+P8Z1MolJSNbrwh0qn7kL5YhJ50tgKos9zmIYaLOazS1MWJ7ARNw//5dJw+j/dXM0f3IJ+/fo9j/yVK5cyKaHGtBrGYhuxDN6JN93KFCE/Mqkbky0COom/lsXrxIkTezVo0ED6gXd3GP1OpDFga+qvefPmHeCSkTB+knTt1Lswy1gDw37KnSK/ghv6rC8mG9KOSuSX/Q6iX8Y/MFTe+fXXX8UGS7ZLL4WrH29bxemGJ3fs2FEYJvEyD4Cj+AeD7ufFixfvxTQqc7zVtN5+++0OkCzayHrWPPE52q1zIuz4rFi5cmVD+M0ZBhvL6rmkz8H0whl6WIQSm/ATFcN4v2c6k831E5kLnLRzuQ3SSFgo05rY4rCQUx3u2TInSNtJgskmmALfvF69er1FDMtumkbCVVXWTzrppI+xUb6rw9X3fO3CpYXj2hntgeWdccYZr7Ps8eKh6xcy2O66666rXIGq6RiZFgWshEx4ywt1+OHEEHfcjDalx5ygQ31mWeuFz3YZAoaAIWAIxIGADpyVLMnGnMnChKqMTZo0kUWsd1HLHWL4KeYpdzNmzDjGFUXCuOeYjk40PC2nU6dOYgPOSzh5JXdguHiIizAkhRMzgarxIAso2DLpBwKJGJWSWMAiQwm+X2H7TiT04CcTF11S18ZkS20j0/7OWPv37/8EHO4Ql2Jw6wILpy8uhf+t6Ncbjv/jvRgu0bDxppGF/qTtY/yqMCabMlcOOuigNYsWLRLmSi4y2LTtuDYquN9+++39W7RoIfOPd06CX5mnwrlgIgjDEqrYLyCupPqM5ikeV/sW3OqwwzODedO6DZdP7zvdjMGp1N9BTbgZ08sVCTaW1Xt56x9zzqX4JnOrW4dErHfnL67vmcxkc+1C1hFOylmknrmGioWBMj6awQabR0XU16apt67S8FnGjUSZbCgP58g8tcOGTa9S83EkfLX/QvW2aObMmUc4XCQvaYiRnyxJOwNz6HqWHX2wMJ525sbqYtp/HTly5NUuwZxdf+jcQBy8Em3eTVXiG+lWDSOcHPwg48CVDW2rpCT2awgYAoZAZSCgA3EVMNlYPBm0I6m4KMPoyCOPXAn1hJYOD79MMPHPUxMbNWpEBlQxJu2Q7RSdcHbccccg7Zu5NNJyMlGmIWxu7AbCSAzLK0bIt6r7CbHnFigsTiYy2JhvqQNjshGK1F7a5+Fu26VLl/8idhLmpRb2utC/5ppr7oa/AuZAw6U2NxZbGASk7VcUk03rumvXrhsgedWU6ecyg03xd+1bxstBgwYJgYdvRfEyWqA6KmNvJauNSluBWYTeyCvnAMkDn6PdOm9A+u7PZ599tgv88pJ+XvKYe7+u/mW9cPXVV4spC9ZpPAQ+0IqKN79nMpMN+Ze2Qenm9u3b/8XyKPMsWtnd+qqoVq1awbFjx5J5ySvbGB/SB5NgsgXAJDsUTDNpQ971KbAK2650sxj2eLc8/fTTJwiq2cEEkfGXp2RijRu3vT+v2j5sUv7b4ZFt7cwVK37Hu2YDE3cUQrI9xXWYhmuHxbRrDenTk12qmUpPxA+a+TQEDAFDIFUI6CBcFUw2TRvu1lDZfAVlKrcLr2LiUPmc68qcyMQpEwMYNrRPFjJWzWfeKslz7LHHfrp582aR6lCGlkuzyh0PVnUgQv+SN9985o2dJyGwcLrUfJfhRLByQavcMSZbxVaBEJNQj+tOGzlIqpSxfLdoFWb0U089dbTLitRJxWbLYgcCgnNFMNmUMIZk718vvfTS4Q7tnGaueFucG2elb+DU0Yn4Vu4kXr4Ld6vUG4jDn2BLqC3jrch5xDMn1MWhFZ8wT0p8h8ufvlPiqWbNmsH77rvvXLznZW0AIHgw3QrzrKxJVEqRn5O5M5zJRsmzrU855ZSlxEClnaPhQeakbtZAvfRJ+JVLMdb/WeAmymSrw7IDjx2xkbyaj8r85nOkWxmXlAzE5nFf+OOV8XOztgu41WEfcgHKFLeaKMY0WfviFNHHBQ0GLrG3qX9z1tU5iHhA0vppQoN5QvDic7RbpSVh1mc5wjcgiIYrUbDLEDAEDIE4ENABsyqYbMyeTgCrVq1qg9O9xOiwl1DgQg13ISZRGjFVGwu+dlO0jHDr4fQlMutCjDU+8waBJJMOGHH34j8vX2mUBKnQX8kPbNTdg1S4K15qktTF2eGHH77mo48+auNyIsRiheaq4iKXRaNJslUcwIhZ2tTQoUOH4ZkL/C109dY21a1bty9p6BrvQ/2Vz3ZVGAIVwmRzjFNRJx8yZMgAl/uMJ85SXQue+WIb2Eh6A/GXk/Tku3C3MmQuueSSh1y+KnIekbobNWrUQJeXUtKo4fLHd0qQ4kTUMZWQR5dE5ji6Jnn33Xd30QNivGsSYpjInYlMNjCaud6Qy686o6ot8zRr9Kl/MBLtWyUxZs2v9EOO0tM8AABAAElEQVQ/kmxQ0//myy+/FCYbpMVHEhq0j5j9l+thXfthDE/IXnEaoy448qRf2lRDPotYXmIT7dZ2hrX9u2hfNVg+uBU57jKJjLp0TCM+xxxzzEfIvJ85TdaFUBu9wxXasM2o2rfMGgKGQJUhoIueqmKyuYILM+jhhx/uAxtsIj3jdttlctUFbufOnX/84osvWrswvgZ6nWRonw0qMpsRR6ldQy8BmigzrwIrUfB59NFHT4XhYC7Eit1upuCjWPG4ckgd9XD5yHTiWfJvTLaKa1Xa9+FuC+nHhUip3M4xGG3CzB04cOBk5z+TpSMrDszUxixtH2NWP9YJxqZSDHW+S+TGmCHxgHB+FOF5WV2W4FDuV+eLl19+uQVUqn+CBxK3wqDkc6Rbx+K2bdv+MX/+/H0YscbF51RdGud7773XBocd/IB4uVEUMoPA/+FulUwAQyBEkGpcqcpblsQjfXDSpEk9Oa8SS63bcLjG8y4TmWyw23k/63PWrFldcRiObIJqOaKVWdsZmJQ/YN5IS+0AlitFl7QVP0y2Aw444BvOp5MnT+7mDiAqZVsX+Qrbf7EWFkYcNDto+7Em8+/m5RQVpWqi0TJQk0Sl+uIZb3UjEKcC/7BkyZJWzH2u2pWMVXOKy/vvv98RtNTP8B+X5LPSGvvuu+9GMIabMx2tr1hp2ndDwBAwBHIaAR0sq5jJxjoQphlsoYzFc7lTq3TRdtxxx1FseXsGSIA4kDSgInMxFsxcxJSyTaDMPEwmP69evXp3poHLFzOvJEjqfrWM69atawbm4CbEXG5iBBEuxB/8DnMpZwPxLAtXY7Klri2Fi0kXXrNnzz64Xbt2cjiILlzZ1txOciEWWsHx48ef6eKQugkXn71LCQKCL/pzyphsSpyBgPkM42dd5lLHlpTkODsjERVKbLpcgOLJfOFHsuLCCy+c7mCpCIlimZeghjeaeVNpDpfPsAS6MuFweuqWF154oQvzpv2fz3aVQ0AwvuqqqyiVGJekEf1FupU5BcbTj88991wzplZZfVDXeRs3bqyJEwNXMY+63gmXX5Xsh32r25lPHIKzmP7UfEe4MPpO2xkZzbAXdjze86rSdVRJFirsN24mmzIsYNfuh+XLl+/Zs2fP+chVUNe3fI50a30deOCBP+FqCn+V1n6YVgVf0j5wANn1SCeuvubW8EWNGzcO8lRglz9bm0SvKJnThg8ffk4izF3YKtVDELK5P0dH0L4aAoaAIRAvArr4qmomm+YD7g7Q//8Y+S+38FCpGojX3+XK54t48aRR/eyzz37RpVFKSkQXO7DPthL+d2I6lbUQdmUKOZ78FkDlYjY+cGFcKr96hDvsxyzQgBpO/2eoK4slY7JVSu0J1pDaOK1evXpc5Jc6HER3lLn7DhWqvVyOfPW9SilF9iQi9YFxJyVMNpXAadiwYRCqOLlA9KakJbhxVNo5Tu6ciUhDqlp8jnQr3rvvvnsxDJp3ZWZSOYdoXMuWLWsNxrhsvGiakfLE9/Ajc8f1118/jHnCZQRpCQ5hf3UehVv36KOPXgNPURlT/B7tziQmG5hBsnEHJtDrWHs84yT9Y0pKkgmt7QztdIgDNtvbmZQvHkk2bR/ctIJNtb/AkIzaZtS/69/FWO/xhNa+DtesYHRoPwMDuDEO4/mKZdY1h5Y/nKv0AFTzJzg8sr2duWIm7njntPPOO492EklnlaIp+K7srcxh2HL944033ujIHOg8xGe7DAFDwBAwBMIgoBNcVTPZXNZkkqRNBpyaxIG+FLGPhYa8484VdkiP8YYJU7Swr7S8cOvAWLTYJihrxFcnb9g/C9ln03BhI624l4LHmDFj+qk6q3NlEtSdTZ40ytOYXDayYuGFskjZjclWcY1LY/a2bagH/QfvyzFzVYIBhq/fh/+tGdYbTuMyNyUISNvHIjYlTDYskGURbbvQ/utGCYmFCxc2h1rmRsQQl1qmnuAKabZpLtVUMqVljL/oootoU61cX+W7sjfmClEzA7OIkuC1mSfrv0Qh5iV98d577+3t1EbjshOFWMvVQSYx2Zh/MMxKMdXikeLUdgYCfhral9rHSmXbj1lhVeBB2ogfJpu3fcSDK9ak0n/79ev3tJYvi/qvjGdYb99NXNBPYjJ9dO0LG8SUzJbN8CzCQ6u4Qlyd02BndxfY2/2OmCuefI50w4+uI8a7jGULreGKY44hYAgYAilGQCemNGGysXSyYLniiitoC6TcSaBYbMgOKyXNYL8hUUkzmRymTp16Ak9oYjq6AOazMrRofNWj7iD5wvfKuiQ92Fg7DgxHKXO4PCIzwREjRlzrMpVNk56U35hsldPcdOGF8aDhIYcc8j3blUp18pm3Mmtuuumm212usqm9uSKlhSNtPxVMNowZMnagTr9ev369nA6mdZ0WJc2MTEh9QJXpCsw/7AuFsQhjJ3kSpDTbnDlzDmAxU4G7ztdw64DA/BLRxpT6UCmkRo0aUa3qJObF1ESJQuzL4S1MIkiLizS5MlAROiJBGu6bzt+ZoC6q+YekVRHyHbO90z9wkbGGh0VwHsG7lLR5xpPml4wPfpls6JfFscYRlJtrYGGwgcm/jv2eWLh2meawxM6elmPt2rXNIMUmtiW1n7CY4W5dn++4446U6jvdpSJ1EDtF8+EQELXR22677TxsoBLnmJsHKs0GszW/L1iwQDQaUjGnWY0YAoaAIZC1COgkly5MNs0P3Lowxv4qgOcuiywy+MxbiX2ojY5yFZMIsS9hYG/nXy7eUoZnlZkHQmYVD0tgOpU1oXgxgLrG+8yfShK5vIZs8MBezAPMG65EMCgJmZ6/smgyJlulVo4Qk2Qst2rV6nekzL4WkmbQxS9U1P5atGhRZ5czW9ymvooEU4w3SUmyOQKusGbNmmTED7D6SqyiPOPxP0FIL0UsIcKXz5Fu3fmHxNnDLuVUjNE6bw1C/Ew7JgNEmUJgEs1x+ch2ySJXzNQ4ypDEhtf+YJoKI0mZqEghYv2X/abjZyYx2cqWIdJ/VWck42PixIm94I9XKtp7SUzp/SvjtV8mG4oUs+1oO6OaKA6+OtnBkE39V7DDSanXEA8wdUut9cNhpPRAnz59nnN45Eo7c8VN3vHMadWcqZm4ThvVOQ22syl1yMuwL8HBfg0BQ8AQKI+ADrbpwmRjDpWZtWrVqjbcNcGriCeBjhw58gpXKl+DvZYbbj5OaiLxEWJc8Zm3MrbOPPPM+S6NytpBlLI4dVVKFG3RPNFVCSMcxb3q999/b8S8KWZ8zpJLFl/GZKv02pS2N3To0GFImf2uVNtTgp2SUdx9Zu6ysO1VOuhlEkwJk00lIE466aR3MM79g2nouFcmPfsbAwFltODQnJOaNGnC+aHYSVREJJTBVFHJHp4kKIf1JIO/hoW7LUwdfIA8xFTzUSK9RYsWwf/85z+HspjWX4mC70vGRajrTUXIcht/fBfrzmYmm441YCjT3IBc2l71fxa7FcZkA66iogf122cUv2zBVctBCeuDDjrovygfmWwyZvI53K3jGTf6ZsyYsTcxsfGMKCR0yZgG8zyHOfM8tKcYFnfELu910xWnuW4AfdacqWo9JpQDC2QIGAKGQDYjoANkOjHZHN4yAdxzzz39VSLDS9SoagKMsf+IU5raMozfyVb9r1y5shUNeiKKUkQL00WasrMGpsNNLl8VvYso5aYR+l122UXS1oUF84dFlyxCwHz8dcWKFXu4PEkY95wtjjHZqqAmdTyAuy0kSRciC+UM46qhXBgcnuT8Z8NptlWAdsQkk2ayqUoNGUKwJ3UCU1JGUcRU7UMsBGTsB47z4TGmNJvOWxizg1DLocQ0r2TGamkXUJHqXqdOHRI9MVV8VOrDQ6RX9Pwlhcy2H10rTJs2rTNOzSw3L6O8QoRGc7OVyabMZGy8fJvFm37RmrT0y1RLsqHvyloPp4n+yNPlmQFth9Eyk0HfZCyECvvpbjyTfoX8R+xLynTEqcqplA7OIMhSnlWpAxwE9yRxB74x6wCMUGH8QpNosMuNtP+U58wiNAQMAUMg0xFQojrdmGyaL7hbYQJ4CTiXI/b1ZE1Ios3VetBw+j8OV4gOqDj0hs0aWdR4mVq6c0M1CNpHc/FVyKSiC6gNGzbstu+++25GWhGZfrfffvt1Li/JEG1xwFNlXgRjk2SrfPyVGfP8888f0r59+z+Rg1LG3pV5AOIq+PDDD/d1OayQPlH5pU+LFAVLjAcJq4vqYhlSbItciTjOGYMlierVfjF69OjjmzZtSkIwpjSbMrmOP/74d5NIWoPKWI/DFKbgRUzVKp3HmjdvHnz88ccPZyQ6x2iE5vpCQPBPVJotW5lsILpF2vmWW2653KGZa3OBlDeVTDbdJKlbt25w7NixZztcs2atp+t0uHnQFHkR5YvJ4NG1OKSofp87d257YmLjmWsZCTo6p0GarROkA4XBpvMGogzL7MTaQuikk08+eQnqb2smrfWZYDYsmCFgCBgC2YmADo7pxmQj2po3uHVBpHzMV6oqyWcS+7hlwB8+fPiNDIMrEUJSFi/YmRmN8EyjlIqc7ijisIVVOGyhIRNJ9eTuKWttZzsnovoqbFEscP6zWYJIFq7GZGNrq5JL8IetFPYrSnT+7ZhrsvBS6QUYK/4WEpUtmcNU94kqKXV6JCrYA8+EmGzKBOXBLZCgOpNF0sV0ehQvY3MRmltgK5PMSx46EHXnXwlDMKv/mj59+kEseSL9xDM/7HDooYeuZdpK7PA53K2M1lNPPZW2Te1KEgHtQ2BYHgqblYI5CNKw2COpcu+zkcmm5gMg9cw1yXaEWNtqknBnUvCUM9l0ndu7d+83gaesT7MJVx0DX3jhhb1322036SuOsViu37BJ8cZ4JhJUF198sUmxpbZ3SPtyNu5iqsIrE65169Z/41AfU9lNbV1YbIaAIZBNCOjEnY5MNoezLGCw09LTnQRarIM8vocMszds2JAngR7jDRNvPSkGcOv16NHjQ8Zbo0YNmdD5zFtFpMH0udfFm+pdRSkn4r+L6WFBXip9Jai6dev2GW3VuTyEiD73P5scxUMM4nrx0OcTTzxxhiuw+M2mwld1WTx9ogZUzaYhP+UWX2A+Sxvt37//FJffPA1X1fnP8PSlPSfKZNOxApsCy1EfuUr4VlQTkLoB8/KsevXqcW6IefCAjldgWN/gMpXI3CHpQoqu5w477BAzXcdoLapfv37wjjvuOMOlK3FUFDDZHq93bAOTdSHKG1P6hn70RjuQQ2Sy5eADMEWkPJTqnDlz5qGu/hNp2y5oxjrSr1IlyabrW44vTzzxxNFZiqtgBgP6PKk8ZJaFz+FuxWSPPfbYQsYcMVFGHZ/tSgoB6bMTJkw4vnHjxsQ/5qm3Oqfh4LVkDp9LKtMW2BCIhUAuTkaxMLHvhkBZBCiplo9dlhmnnHLKWDxXg3QA38lVWFhYjZJm3377bQAqn6OwEN4JH4r8TMCOIMmHu/G00067DkZAA5BYKwBjjROOXEVFRQV4KMZppJeCaLmaz7hT1YcZTxFPdXz22WcH4TlYXFwcIoiwmA389ddfgQYNGgQuuOCCK1u2bLkCfvg9lD8822UIpAwB9gn2Ibibx48fPxCE4YY///wzH5ILbPdyoU0WoG0WjRkzpg8YCLfhJRdn2cz4dSVPb+fvv/+WcaFDhw6Pozo2Ibcc22ysSEG1YX6R9j9w4MDZUFtaS2wxT4T6RLgkgL3ME8uWLTsZ4TluF3sZNuHChHkn9Yc4en7//fcBEDmUGArjreSVy1MeTsNci40bOYVP8x4xkH2IigD7kEqzoW9NxMFIMi9HDZTFH51d3AAkK58Bg2k+isqxP2pfyGI4UlY0x7wMgJH7DCTZaColq3B1Y18R3K1Xr17djcBhYygqfjrGQqXxRWi1vEdMsD6xthYVtfg+oh5kIjnnnHNehq3nJcTWbdRFjABBhD5ZvHjxaXiuDY+JzGkR47cPhkAqEEgVgZ6KvFgchkDaIoBBXCZTMLhuhFrCqyTudYHHTJP4xyRcOHv27FY4kVMMTGMC9kvsCzMPqpqzBw0adCF2zgIgVmlzR3AB0ysAZp48w/jxYCwOdscf5iupfoyyyQIKbq0pU6bcAim1alAVKCbzUBLDDwgqqiTRdsXoXr16zeSzYqJ+zDUEUo2AW8SS0fbtueeeeynsEgb++OOPaugbsihDGwyg30n7B3P4qnnz5h2APCTdJ1JdjlyKD/UhDPr99tvv1y5dushJf6jHyNyYXAInBWV1zMp82AP9HiqDIkmLDZioxB6+y1i+Zs2atjjhsxOzgYN0QuN7rGzpHLFp06b6mHe60j/yETW8zg8w0j8dXo3RGgvkOL8DT+lLYIC83LFjx/UIlo/5Oef6FzY6g9yIpM1OqCPf7eCL2ibjhDinvbEtYd2Zj9M2f7rxxhspxR+VmZ6JYOnYhzVDh08++WRfFpFr+Ehl4Roc36tBWyXQuXNnGujnldS6uyQK+yUCbk4rgLsFp1A/gb5NvKOCgzlNvn/xxRc73X///WLvE+Gt/0dFzT4aAoZAziHgFvCBNFYXlToBoSiTKlUl995779/xspRNGkzEXOhy5A+CGXeZBCqR9nKPsR3FAu5W2NWZzbjA8Cqltqm2MqCKtTJZ+2ye9ArAxHiB6YF5GDa9o446ahX8N2ApFAs+Z/Eliy6zyVa1NaxtlLnAaaJPwKHaaKk2CokOsUsFQ7jvs+/Qrzcc/9vlCwFp++jnvm2yOYZ8EJsFz7sUjRjxBX1szyrN9Oijj3Zt06YN552gqjPxOdwN5qf0mRtuuOF6l0Lc9aLp4aTtHjSLgPBRVVQdE7wYEs88mKQb09M4XNrmJIeA1B2k659BNDEPoKAf3uibZMYGs0FdVNszxqjhKBOviEySks9Z/StlT4W6KNqIjBPXXXcdzYbwinucKPGeEb9SpiuvvPIO5JZ2laPatURbk3X9EUccsRrrilosoa0vUlvPSlPMnz9/N27QEWK1J8rncDdoFbFdfemll450ucnlMcBBYI4hYAgYAh4EdLJKdyaby7JMzqNGjRqA/xz4ixxzTSYBJ90WxG7XxuXLl7d1YXztrigecGvDPtsypqOMNZdmyAArDkq4z6WRqC0qKQ+OMD8f4tnlykM1WKYJEe5fsePXTtNybrY7MmEbk63qq9nTJ/4BScqFyFE55jMWZLJQRn1RZVvqTsNVfQkyLgeCXyJMNpS0EONg8NZbb+3DUhtzJfV1r+2a7RyqS2LDU+3gIbWwBAmIZxnLMadQHcfvJfMETm+8AgFj2i/StI4++mja5LPT3/yiHcO/9in0sd7YYGB9R2USsM54ZwuTTdsX1ETXQ5KlKcqW60wPGa+TZbJp+4AE8o9Y77Ugrsr84HMWXTKewTTLLJSp3MYy33lvjK3CeITt13scBoK3ezYndQhIvUBb6DlEWc4GL995bx0HYMbnLcwztrmaunqwmFKEgDToFMVl0RgCWY8ABnIO8oHLL7/84bPOOusVPOZhAuYCVy6osuVRquatt96qC2k2PaDA1wIQu2pMgypyP2MRcCNOPgr8/vvveVSPcMlQjVTss02aNGkg7ajhPW1R+erPbvFU/NVXX7WYPHny3bS5hrIEqJbKy4nIyzMW9bfCtg5PV2UaJR7ki/0YAhWPgKdP/Nm3b9/BMD78J/pEKZuFzoYgpUgvf+SRR3ozV377RMWXJLtTwKKXY1R+p06d1mOjYSFLq+pt2V3yyi2dpz8UQVqM6vsBqM+E5odwuUEYeQ3p53q//fbbjvyD6SzeDSCJe8mSJf/HcFTniXahL4p/qP7MRbp/wS/ns6j5ixaffSuNgPYpSKQtgl2+DfiaUyqj2r6g0ji+WbNma1F+a1+lm0ii/8iIDwDXiVjvrcZjHtaJWbXe03XvG2+8sev69ev3YnlhGiUi04xSuTQPg7EsgLGWTDluHNGxK/UIyHyEU0Nn1a1bV1R0dd4Kl5SaQcDp8vvAVE97+lFV4HD+7Z0hYAgYAjmHgC70M0SSLeAm6cCnn37aGmqjNBzAHReREuCzIyYKKeHmDihgnfpigDEALpn43ek5EU/7PPzww1czLyVB4ktHMYdbB2pdcxC23K6RqmPg9KXRGreGc/+z3RH8TZItrapZ6mT48OE3I1dUkfvb9TcS8CH1bRCf32Lh1ZI51/7KZ7viRkBwBna+1EXdhkMQ9qIWuJTiZeLEnTHzWIKASjONHTu2W/Pmzdn+ab9T+gGey7k6L/HEwBEjRpzKWDQOPke6dMyHuwPVpeAv1M/4XPZ26RRRrRTpHMd440mH/uzyhYCsKbp37z4Xobg+iCnNppJKmawuqtIrlGLDYVNNiJiN8SVrxWQk2bRtUIrts88+2y1bcdW2AtuUB+60004cv8hELDeO6TtVFeU6G2NgDeKiYyKf7UodAlo3c+fObQl7k5sRc1QzCJxrMOeJlCFMidzkchJ9Byh12bWYDAFDwBBIfwR0wsoUJptDVIhH2Jvps/POOwuDzWsTR5lusC3w09q1a9u4ML4YbYoLXDLCKDUXzhaVTDA4kOA1l0a8CwDJC+xuUN00pH7KZ/dfygR1n882btzYiHHrBMjnHLmMyZZmFe3pE9ued955Yo8Ifa0UcYn/0ieg2jHFZT9RVeo0K32lZichJhsWvVIXTq2QGfY15lVqCTM8MU9f2A72MlejOFGZX/zuqZ/+rvhSz9GgUAYZJERPrl+/PueHqPbYwGiVuaNbt25ff/TRR2LDU/MaLR375g8BrRecMjuY6tmsF9wyf0dylZGSyUw2NQsAo/y3OsRsjHEbsskw2cBMkvaT5bbY2GSkvWDzeoTrJ6ENcve/VB/CeCbriQsuuGAMA+Oy9laCQ0X8hjblML69jgSoyht1XNP1HrSLbnEZijmnVUTGLU5DIBwCNliEQ8XeGQKxEeBEnHf++ec/hiPOH6R3R+xLSJyMkwc7akVvv/127QEDBkyHis5O+FDsh1HFXRr6h/sTJAL6QwXrD8RbgHRC4vs8XQvxFj322GMHQ0z6JiYO/3SiXfRQPHHixF6PP/44ia2gV1yeaqkQj8/bYYcdAjh8YRAkH76Gn3zkJZRutMjtmyFQUQh4+sRv48ePvxTE4gb0iXwsxEJtk6od8Fc0ZsyYPiDEhiMvVKWO2SkqKs+5Ei8hJjNll112CdSoUWMpy42FsuFeQQ0AeHMOYtPeBBMFnzMZVaOLlKSqecKO1WHOT6jfRAoDcwTyCcRm/oYN1EzEhFFiNUGey/5oHsDQWQu1bp5+yTwyr3ZVAAIwJ7EY9c+YiXMFpJA+UYIRJGuVww47bN3FF1/8EHOGdUn6ZDBDc0JceaLoIYccshEbtuNYjGzH9ZtvvtmD5cQ6PeIYyP6E9UQ1qi7iZPP36B9XdneykjJW1S/nCWGSYUxbxkygXUbNC+Yb4WP897//PQrzEiUNi2xTJypk9rESESCBbpchYAgkgAAGckoGBLDDPwQnjnaZOXNmO0wMhbB3I/0KNqPyqT41a9as1lBv41Hol3PhUhIsPqID/rkAyGvcuPHqCRMmnLdu3brHYEMtj3YiaI8AcdE+Th6YZIHRo0ff/NRTT72N4+xfQhhOVNyhK3UhPrGxsWbNmhYwLvoIJqZ8Mu3IFFSPzrZPNTAHh8EmHE8I5KKiXFzq31xDoDIR0D6BvvctGMWXwUDzk99//301b58AgZ+3ZcuWwIwZM/41b968F0GUvYk8so1HXFBXZhmyMS2MdTKOtGvXbjXsVb4/aNCgAMYjMjizsbjpUia26SIws56fNm3akbEIEqjWSGVg3BdVaoR101jU+Uj6DA7y6c5Ck1HH+SbSpd9atWo1/6WXOBVJv7P5IxJgCb6nXTYyQMEA+AR9bh1O5duRzBKMe1nb4dB+2Y4KYKZjCtSRv8QzN/+sbSXYhjQY+nQR7fxCRe+JbLXFxrKircj6d+HChc0HDx4s9tjIXFQcyrpcU3ADGur4m/fdd1+uIUT1neuNsn7tf2oQwIZp/osvvliEzYOFTZo0ueTLL7+koEHEjR21y/b555+3/fDDD2sjF1QztcsQMAQMAUOACJDpRDfD1EWZZV4yQU+dOvWEpk2bchcmiIUuiRJ55iSN52Lap3nmmWeOxTOviJN6yeewv8IEu/baa+/HV56sKEdX85k3GGVcaAaPOeYY2o1oiGdZUNDVS3GGWx0SarPxPqL6aZ8+fV4vG07/55Ar9WQ22dKvxrUtM2dQC50Kp5zKMxnefI+Tp96HfzvhkGDFf0nbB1HSD0FCdk/4HOnmhgK/HXfccYvg8jJCpASHCvtVlUFIOp9Qu3Zt1k1UVU4wn2WegH2hNT4OP5B6RJj3EX9M218giES9Cidf9nIFT2S+qzDMsiVi7xgINUEyAMrZVeU7753J6qJgsMm6qlmzZsW0p8V6JNOErl0la8pE1EUVV2zkBqERcRixzFZctVww89KZa3IUlZtApfoI3oX+Yy2v4yVPcLarEhGAQEF9MHz/RJJcf4RoKv733qCx5FuHDh3+fvLJJw/Bt6xtvyybXZmFgEjcZFaWLbeGQFohwEk4v1evXjPvu+++/pdeeukY7IxxUqgGMWae+MYTO4Mw0Ftt3Lhxo7Dbsga7Yp8iDAkXThZxXVhQi9Tc7bfffjMOOegKCZ32Xqk5SqJhQVCIHaDdwBS6FpFeigVFqbixmBCpB6jRnf3oo48eg4/F2PUOjQGUaKMUHnbsfoEUykAsuBieu0icxOwyBNIGAS6MuWDGXfzAAw9c9vHHHx+yYMGCBtgFLcIJv0LUoy3nc4cezO2ON91001Bk/lqE89Xv0qbAGZARSg7ywu6zV60m7jEuA4qYdllUaaauXbsuf/nllze8+uqr9cFIobq/MMbKZhhzk8wB2PFvjvnqAHyfji4h78r65f+SaYcC08FtevToUZ3vOLfRDXc5adICSNYVYT5ZSz/oo+yrfLQrhQhwDER0HOuoHrUK7v6o9xSmkF5RYR3Fsb0AKo1PQcL+DeQu606+rArEue6j1gXGkAWw/TsfG6zss1m55oM0roxdGMPqYL0cE270K/GDcbMa7BNfCkGAArdxHjOseUgMAa7R0M8LYTNve2DNRcXWeBUxMkqyoT4LMacVvPnmmwfB42tov5zTsrINRwTCPqQlAiECOy1zZ5kyBDIAAUzEohIFA8SPvPfeez0nTZp0BCUGaCuK2cfCN48MMZ6Yg8GfxlNltxDhOJ/ERYQ6f/lwN2IXd/AHH3wwE3Z1CkhQqXoIJhv25+KRI0cOxKmmX11zzTUj8V8nGyGkIHF3/PXXXz+OiweEraaEMSYpHpcN74HAiSeeeAvUMWgPQRbw8tJ+DIE0Q8ARAmQCrwcj7VzYi3pm5cqV/wRjjSoeuphmuw9Ale6K1157bSYItMX4a+26AuqSY0rNmjUDLVq0WMjoaY9N7XlVQHIWJRAA81gYWPvvv/8aMJi/w6v6uDmnhKVKWEe8fvzxR9pvYz+IesHOJ+MJYt7o+PXXX4uKqfatcAHZ90j04NS+b2G2YNWVV14ZymM4//YuOQTQxwLsYy1btlwBSUZqAyQXYZqGJmODmyfQFgjgkI9JMBOQpjnNrGxh3RcEgy2PuOLk4Pswl5IxoWvGzCpMHLlFX5EBEJtyh0ENkUYMizEmRhwHMdZxfRF8/fXX96hVq9a9GN8iqi3Gkbx5iRMB0iOgpcQ3nzmnRAvKeiEtg7qU01/ht2SiixbIvhkClYCAMdkqAWRLIrsR4CQMgp+T8RZImV0KG1HvLVmyZBvaKCKDjaXnAQX4XjRlypRuYIBdTQYY/vObn8lApOZoJw321y7CkdUPYmIJSc1Rcg6EVgCL0cD06dMHr169ehYI3k+QBvt5ISagWj179rwF0nTC9FPbcfhGhlshmGwFkIIbDSbcv/HKGBEExq50R4BEQT5UQmfD7uGdOOjgJhBkWBsXyjY1GdCUbsMOdnUwJJ5ZsWLFoW3atFnF/orbdjoroHYx5v1RAdFalGEQ4NyD13CqBY888kjBHfNAzDkFRAs3VXZklMqoCRN9AH1EiBsQpTvgpFD2KfatiOtGTRv97geon/3IOF0ew0Vv71KEAE59/YxEJq6oxGiKkqv0aGiCA202/9BDD52D9c/L0BwgQS3S/ZWemSxKkExxtJu8Zs2arYEdzZfOPvvsbMdV+sdnn322G6sR7Yrlj1qjbGZkRv7yyy9cf9tVeQgQ93zSNbEurPmkXlGXamuUdcV3MefCWHHbd0MgGQSEAZBMBBbWEDAERCVGdgBh7HklxO2vJCZU3eAuDC9M1FQblYMKoOp53bJly/bAa1+njbp4ZMbBoQSPOrtqeRD3D1mhBoMtj0wFnGpaE6qr05FuA4Qjgy3v3HPPfezZZ5/tgO+hwxkYJ09BJYON9txAVPFYcxJXNjkRCLvSHgG0bekTMGQ8Eod5LES/q+7ssUneKQGBNl6I3eiGYE4PYV9A++YOdlYSpFVRYSTWkC4NRP8FrL9mHqjKWBV5ycE0pR1DGkXsBpGBFu0CQSKfoQK1Cx9UuiNcGDLgeEFCMZ9SirjI0KMb9lKCCO2Bp4rysjVmCQ4V/bsBYx7TiFo/FZ2JiopfGSHYNHwaBZTNRrg2viQBOPsx+qvMnQceeOAU/KfBeJHcSiLadA8qbWa77bYTF+vzyIOZpySACfBU40a53ZWHQVwMNlaTM4MQAF11EA6Gq8t3WN/RscsQqFIEbAFUpfBb4tmEAAZ1GdXB3HoIu4Ivomx5YKyFGGBgZOVhci9866236kCl8x6W3S+xj0meyXDC34LTRs+AnZxlEPcvIKNMsSRTgenCPlurK664YjD8b430LoSa6fHwQ+m6kCQCpe1oj6NTp06/3nXXXSchnm/gx6R8FExz0x4B9gkwA6hKvRkM7sGwB/UnpTQhnSkEBAuAPsE2XwS10TPGjh17FN9Bnc3mPwKRgssx2QI777zzV7Dr8wWjpCpjCqK2KGIggLYvhCKwX0EGmjK6IgXTjR8SJM5PxHpSdV+EKfj111/Fu5vmwkavDD5IVkkb0LyF9Wwvk0ZAGdk47XAdDLn/jgjllOWkI06jCCjFhisf6oxrsbaaxayhDYbG9jTKakZlBWMFzSoU7LXXXptxYAIPD+J6NKPK4DOzHCel3YBpy1MoyZGOOwqOe3ZXLgbxVo7OSV7aJt6w5s8QqEgEjMioSHQt7pxCgMQ+LjjVinGwwBndu3f/mMS9lwG2adOmAhAsxVQbHTZs2BAC5Geid/5JFHHH8WdI7ty46667il0NJXTpBzs7wkgDQ+GSPffc84d///vfD4CZFoAfOZDBxUN/QmCdfPLJt+Mkn48ZL25bwBIguzIGATADRLoBJ1sugMHcM2F8X9RgSEiwELoIo0QE1D5kpzNjCpcZGRWcgfevdevWpUSEXZWEgDLCMLZvVCZXPElTejmWP5VkA4Nte+1D0cLoXAaGj0iyad6ihbFvySPQvn3732CTbRNjUiZq8rGmRwwYU2Q90rFjx6cgrbeORUQ7k/EmPXKYmbkg85I5b9269avYZOVhXLLpSzcbLx2/4NYB03YHV8b4uWzZCEqWlQljXx5M8/wjy4plxclgBIzJlsGVZ1lPPwTc4o+LwJ/IAIP6VICGZZXYZ44xD8jEDgbYUBhsPxavuGCMaHyVYcJcXCDlI43nIJEzGs/cwQ5Js1GagYttEFIBHJKwLYzCyw43di5Di4oaNWoUcocY0j8Lrr32WqqJCpcwTFr2yhBIewSweBaioW/fvs/vtttunzPD3n6Hv9XIhIB6NQ3E25VCBDje8MJ48yfGPo5DcIwQFlAq6QcbJr8D87hTQ9+I6VeZZOhbtZRIjRkIHsDwMUZrPEAl6UelRTGH/wYG1C+MDvN+1jCgOH6TGQwzHGQGzWP5TDqSKCR3sY1Q42GXXXYJwEzIeBdbVtOD7hCXwOTJk5vCvmRblhmST1ld5uRaiYU2BAyBZBGwASZZBC28IVAeAWGA9e7d+1kYZOdpotUgZRBigJHRBUK/6LvvvgtA5XMUiJed4KcIovq++qMyFW677babkdZcikrT3ppmh4QviS4uVMlwA4MhRIHx2Haq1HXr1m3NkCFDLtIwRhgrEuZmMALV1UZHWcYA+wFu2+msuMrNGgK/4iCqmJgxzhfDHIFEHo3ZhvYv8wAkWbZC/yCnDU5E+4TCPV23bl07zicIE1fmMRdl5zGXcZW+Sjz9jbr5iylHq/sqyVkSiap0ftOmTT+BTdnXGdVTTz1VwtFPIt5cD8o1ITEA8/K/YNAKrhwEcgEX7gNhfGJRc6XIWV+t2nRB41TH+Beic7K+4FbAtEfAF1Gf9qWxDBoCaYIABn1ZCOIk0SFggM0jA4yMNc0eJvp8LIoLZ8+e3RJSZNfwvV97GJhL9FTTH3Gy4gCI/GNz8g+mE1qEcvIhc00lTZgOF65IP2+HHXYIXHjhhYNatmy5Aq+F2OJ3uwyBDEcg6qlztgjL8Nq17IdFAGN81HZfNpB306Xst7L/cRpfq7Lvov0Hk3tjtO/2LeUIUAo9q4hL0spqzqJLly6T8J+cEVMVTUHTwRpQ1ogwEfIccKUEZM7gqpvOKHNW9ZcUNIuMjUJN8kAycw3omZ8ytiCW8axDwJhsWVelVqB0QAALF2WAbYRKxyX77LPP72Ss8aABzR+IHNrEKQYj7rI777zzKj7j9tUnwZiTMLDLturiiy8+r3HjxjwptJR6qqZHF/kKQJJOXl1yySVDTzvttOf5WpmC8sF+DIEsRgCSPDmxY5/FVWhFSwECnKPijQbzloh+xOsf/mLae/MRl3nNQQS4GQjGcf6+++77EzQCniYEWKfE3WZzELK4ikwmEzdjYVIh0KZNm5cZKJdUcP1sLhAbrpm5ZsAtJljMTRscZFMJavJF1MrBYTuBY4899h7UFw+A4UFYNlawAdtVpQj4IuirNKeWuCGQYQgoAwwi+SthJ+oqLG5oA0ImaxaF0mVQ75RSzZgx44YPP/ywHV8jnN9+KYw2qFM8iZP9xjJCni4qEZf5wXuxlwQVgdfA/LuZn7lutQmpDFD21xAwBAwBQ0AQAGHqa07CfBKS2jYIDYFEEEAbkg1JrJ/ehj22LxiHrVMSQbJ0GN1kwuEkX0OTYQG/mgpuaYz0H9qbrI+xVhdtEK7Z7U4bDCgcEACDLX/77bcPXHPNNUMuuuiiia7ubP7RRmxulSJgu41VCr8lnu0IcOeVE/XAgQMfWbp0aQ+cOno01DkLcRiC9D3sKObBjk7h4sWLa9911133AY9uZM6VBIt/J0bTuf3222/+9NNPu4Jp1x47PIXc4VGMmQ9K01FNFCqs1z322GMBMvTwXhaz6s9cQ8AQMAQMgcxCAIwwXxnmHIMAcalMuc0ZkeqIJxGYQqgRjz/zkzIEsk5qg8wMXg0aNOCp57xo0sJfI5dg9hMOAWg0kHEeV/8PFz7b3ymDDczIAE7MFmZbtpc5k8rH+oHQQhHUQz+HpOuQc845Zyrz75d2yqQyW14zD4EQAZ55WbccGwLpjwAmAsf/qrYFD703bty44Pnnn29HGwJgtMnxbmSEkdGFU48OHTZsGM4hGDKME4ifi+nAP0WkN06dOpVScc99/vnnBVtttVVwy5YtEhnSp7h78ffff5+3ZMmSLvD/FphsfpIxv4aAIWAIGAJpiADG+jyO8bEuTkjOTxHmi7ASz544OHcE99xzz9dmzZp1oJoa8HwP+wgmW/2wH+xlRSHAuvclbVhRGUl1vNiI3CrVcVp8uSsVqIc+xGoDUFcugk3A/B49eow55JBDpnz77be1McYakzcWcJXwnZKFtGndvHnzb4888sjvMI/RrqBItjlaqBJyYUkYArERMCZbbIzMhyGQFAJu0KfE2E9PPPHEjcuXL58OBhjm+vwg7UOQ5sGEXo0EzOjRo4c+/fTTb8FGBm1l+N255QIgv1evXi8gnotgc+1BMNionho6+ADpBPAuMGfOnMHvvffenL333nsZpdlwmzRbUrVsgQ2B3EWAdmp4QUr3HyT2Mdb5lsbNXfRSVvK8TZs2SWT/46OVj1u/Ye75231FdYWXmqatJsxHtOO5CQSmzB3lYyz/BhIGxhgpD0vK3wwdOlSYoM8999x2v/76ax0mwDVFyhOqwgjjZYpUYRYt6QxCgP3DSUlysyFiX4E/ronzMe6txJr6rQwqYi5mlQuQYsxjuVh2K3MaI2BMtjSuHMtaViEgEzbUNJ+F7YAxOOxgAO2mQZqtOksJIqYaVXI2bNiQD5XS0SCEDsaE8Z1fBhjCyUQzYMCAiWCinTBx4sRjveqpYLDlUY30zTffrDlq1Kj74f8wpFMIF054QiurasEKYwgYAilHgIOHi5Rqgv/ATePDdlUiAiAGfaloUhogVvbIYONVu3btryDVEct7SKXqq6++2pGewaQLaBwxA5uHhBFYtmzZNpCI34YRqJplwpFZQEMgixHgPhDW2iyhTFtY+4YtLZi7wozDuFrbedgKtuuKbDwLC1eVvGzbtm0QtqVJvJiQQJXUgCUaCwFjssVCyL4bAilCQBlgI0aMuHnFihVdsPtcym4adv/zIWlWCLWcFtddd921SPYyMNl82RjAZINkhGH2N1xRT2U6YdRTi2CTrWuTJk1GIp1BXG3AvxkWTlFdWzSGQC4hwE0Clhfq8A0w3jTG46cqZZNLOFRlWSHJtBPH8HgvEJoxCRNlkoHgLMTmTEAl5SKlAX+UpAr8+OOPTegHBGn8GYoUqb2PiACk4qXf4QClxlBnqwWPIh0fMYB9MARyFAEyY7iexiFka2fOnLl89erVbTkG0i5yOEiwJJbXHqZ10amnnmrqouHAqqJ3ZHiyTu0yBNIVgbCDS7pm1vJlCGQyAuRjIf+0m/bDaaeddh3sCfBkHLGbpuXChE7Gd3DSpEmXTps27Tg8UzLNVz916VBl6xecNjoYR7UHITGXBwZeiOABMSRxPvjgg5djd65HIulons01BAyB3EbAMdmKQbjUwcErzYiGMgByG5lKKb0wy7744osDmBps1URNVInGvfbaa57zWEJNhgmlUhubN2/egkNz6CM0h4TxTpuf8hrMuF3c95iMvHDx2Dt/CGCur/nzzz8zEPisUavIX8Tm2xDIEgTQR6QkcH/COPW9K1bEzkIzK/SDca+V82tjmQPCHEPAEIgPAV/Ee3xRmi9DwBCIgoDYTQPza/agQYMupj9nN02CkADC7lrwu+++C4wdO3YUbLdxgmeYiISQBCz/wwVBPph5z5988smjGR6MtdAuHIliiM0X//DDD4Fx48bdvWrVqjbwk0g65VO2N4aAIZBTCDjCPghpXNqXjM7lySlkKq+wmDMaMTUlJiOlTEkz2uaEZNoK+qHdtUh+ISUgRGirVq02tGvXjvqiCPq/zZqy4ZQwxRy2LdrEtvwON2L8ZcPb/8QQAFOzqWOuRmQaJBazhTIEsgYB9g2heaECqhzpiIVT6WwcItbVjWVwbCyLCJh9MAQMgXIIGJOtHCT2whCoWAQwUcuOGA4mmHDWWWfxgIM8ECWhU95AqIrdtLlz57YAkTNWc+N3gtd0qJ4KW3CvIN4CqJWE0sEOnaTz6quv7opTTcclmo6GM9cQMARyGwGo3lBltAVRUCmo3EakYkvv5gQ4wYIaNWoIc1MZXVFSDoKA5OaObLpEqyeqWDEeGP7+oGHDhqv5HI3JRqPi9AN10UbDhw9vwmenNsxHu1KMgNYdpEfbU5ItFoM1xclbdIZApiEg4xOY0uJiUzsmUxpjJcdVo5UzraYtv4ZAGiBgA0caVIJlIbcQwEKYtiGozrkFRMylnTp1+hPEaQElyxQJqOcU4HvR5MmTDwWT7F94L4bW9Hs8riedH3nQAtJBMuXTAVEm9tmQDu3A+U4nnryYH0PAEMhuBCgdxZOLYW/yMFfSmARMdiNS8aVTBhZOk+6IwwZErUklMMKl7hhkBR06dCjcddddv6IfzEUR64lzCLzAqfY76nYz/UcjTB2TrRiS0f8E4685/SN+k2QjEBVzyZoB9vik7iGhUzGpWKyGQHYgIGMdTKh8xuLgMJeIYxMHPfqBBsjW77//vpzcy/92GQKGgCEQLwLGZIsXKfNnCKQQARAeXBxXg122T/v3739eo0aNiilZhgldFgEgUKg2KpP89OnTr4eto93hn2F89VmXTl7jxo1XI51zd9lll6Ky6UDNRNKBDbjrPvnkk3aJpIMwdhkChkAOI0AmGy8weepj/OKYUuxceW8/qUdA7d7B5uYuK1euJIelKBqTTeeXnXfeeU2fPn3eZ45UWi1W7sDAESlozk2RLn7Dpk3wl19+CUBymnOWXRWEgOtbQbSBumBuNnLJyFxeQUlatIZARiOgqvFQfZ+HQ7+oys7N7rBlchsGQRwoUgfaHgfRE/z6Wn+HjdheGgKGQM4gYANGzlS1FTQNESC1knfOOec8ARttohbqVRslM4yngr7zzju1LrvssumQbmsI/8VgnPntt8KcQzpTkc4Y4uBNh+qpTGfJkiU1r7zyyukg2HZOMB1GbZchYAjkIAJg7si4BImqDlOmTNmXEKikVQ7CUSlFhrqgcLzWr1+/L+aL0MEDkRIHUSn+IdH8NwjG3+gvEpHpiUOo0P333/8ZvkM9ez6VfwQjT16C6Xe4+yrSVuV92ptkEMBJh9Lf5s2b1/bjjz9ujriCkDb0uzZIJgsW1hDIKATatm0r4x+kcX+CFFvUvNM+MrRLCteuXRvYsGED+5ddhoAhYAj4QsAmZF9wmWdDILUIKNFDu2knnHDCR2BwVYdB6hAVg//5ZIjNnj27FWzcXMPUwWTzbUxa07ntttuG9uzZ88Nw6XBB8eKLL7aAZMN1mk5qS2uxGQKGQLYi4CSoimAoujqIEjLqOVaFFxPIVhAqv1xCNMIml6joxnuyKCSoP3ZZZf1IHJGyrtIf+P4F49e5JJJ/tQkHabbm8Lsd48dl7SASYEm+x+FF7WEHkbFQcjTJ2Cy4IZD9CLRu3XpDixYt1qGk1aLZmASjTXYMcHLzEehbIilsY1n2tw8roSGQKgSMyZYqJC0eQyABBCBFwFVxPtwfYFx6cLNmzYK//fZbAYiZ0GoZO27UwyqeNGnSpZBcOJ7P8O+r73rS2YgTRweDyCpmOlABCqWDXXBJZ+TIkQNgw40MPd/qqQhjlyFgCOQoAlQZpQQAmD4nOQhC40uOQlJhxQYDk3NAEOYEWv7000/NmBCwjzov4LvUR8uWLWe7jEX1Tz8q/QE7Rt+1b9/+D7xCNUc+YRTzleQLEiDNx4wZsz/jUKkrPtuVGgRUihE2EI+EZGIgFoM1NalaLIZA5iKAMVPWtF26dPkcB7ksZUnQb+QAmHClwngpmwNgslH1/Z/h/Ng7Q8AQMAQiIRBzgRUpoL03BAyBlCHAST7/9NNPf+6qq666mLGCUAlCIkASINEKabbAd999F3jwwQdHQQ2HRo4Zxq90gKQDZt4LUAu9CIw3Giov9qYDaTZJk3bg3n777Q74Y4w2QcR+DAFDIBYCUBWUMenLL7/cGzv+HEzMLlss0BL8rlKCn3/++d7vvvtuPURThHkj4pxAxhjmkoI999zzT9jo/ILJIo6YTFBHmFbDvPHW9ttvv5LhUM8RVUA5X+F70Zo1awLI2z70r6dg8tmu5BFw0jTFmKPrQZJtT8aoEoTJx24xGALZjwDsUn7EUkKrIyIdzLEMVxCnJdcbNWrUMfzjd4ObYewyBAyB3EQg4uCSm3BYqQ2BqkEAi2aZzXE4wcS+ffvOQS7ywFgL7bDRblqNGjUK586duxvURh/QXPoVXfemc/bZZzMdUUfV+GgHbrvttivE4r3mfbjceyOUFSBzDQFDICICToqpGAe1tB43btwB9GhSTBHhSvaDMMiAdXdsllC8LGp8YHyJ//r166/Bhs6b9BzvoQcaMQ7O+YTPjvjU1+VcMHxkbQmJxu7uY2guK+fZXvhGQPvU4sWL94EkW2NEUGz22HzDaAFyEAFsGkipO3Xq9PxOO+3E54gbExjnqtGMCjYLAt98801LCRjFv/tujiFgCBgCgoAx2awhGAJpgADVOTH586SjLTfccMPl++6772aogJABFpIYwI5bAb4XTZ069bDbb7+d6pxB/I+4QAhXLHjXdAonTJhwXo8ePVYinQIefKD+N23aVAAaqfjxxx/vijwN5Xsm45ehp/GZawgYArmBAJkvGDuCUK8JfPDBBz1YapNiSn3du7G4GGN1/VWrVnVhCipFGCk1hBEmG6TYlmM857wCR8wVRArifS9rxQ4dOkyrU6cOJa2jHpigcwWkr9s/9dRTezAizm/eCO05cQS0T3300Uc91q1bJ33OVW/ikVpIQyCHEGjUqNG6Vq1aiV02r3mWshCgX4ldNpwyqnbZCnV8K+vX/hsChoAh4EXAFj1eNOzZEKhCBECEkPDJw8S/sk+fPleSsQUJttCJcVxEg+lWDUeLB5577rlrly1bRuLF92mjLh3agfumd+/eV8PWTpAi8147OyCUhXk3evToISCSSCyToWfjRRW2D0vaEMgEBECwyNgBldFjMGbVQp6LjChJbc3pWAybZ0fgZMlGxDiaJBPnEkq71a5dOwBGmZwSijBxj+eoP9nsOeuss96ABMgahM2HPc/QBlDZ0vEQDMwhhe+99942OB1bmK2Yd3xtCJWN0/6XIOD6UhGYa/XBzKaNVtqVMmytgRgCcSCg6+wDDzxwTYMGDWLaZcN6W/rW8uXLOy1YsICmWuzU7DhwNi+GgCHgY5FlYBkChkDFI4AFtEgbDBw48GEQNLOQItVGQ6eNqjon1ERq44ACUefkosEtvP1kkJJr+bTPdsopp9yP52q0o6MRkEiCmHwx7L0EoPZ1N6Ql2uAbv9tiXkEy1xAwBMoh4Jg9xZCyaXnvvfceTg+q3lbOs71IFAGZJ95///0+33//fQAML0oaR4zLMcTyO3bs+A3G/EX0CP8RmWRlIwKTjpFXgymBDZB6/taFL+ut1H9s2ggTD0zA/0Na1fHRmK2lEErsj/alKVOmHIKTfHchrjQnkVhsFsoQyF0EIM0mpyxDmyPiupZrYTCxC7GpvfVLL73Ui2hhzZ27oFnJDQFDIG4EbGKOGyrzaAhUPAIkZnDBqVY8ceLEPlDn/KisOidPBeV3LrKHDh16E3OF/74zp0QWVE9vPuOMM17GQr3gn//8Z4jRRobetttuW/jqq6/uOmzYsHHMFxNR13eCFsAQMASyHgGMD2T6BGHDJgDbjmexwFBvi5uhk/UAJVlAEHhctxXPmTNnbxyC043RQU031lpOOHA4VXTRDjvs8B2CcI6Rdwwf5yXj/3777fcY/UPCI2qdgjhlnoLIY4eHHnroSIZBmrHySW92RUFA+xKI/tM3btwoDNYo3u2TIWAIlEFAmWQHH3zwM61bt+aaFoK3UYcm+fjmm2/2gV9KZyeysV0mF/bXEDAEsh2BqKNKthfeymcIpCMCjvihfbafTzvttBt33XXXUuqcJGLV/g7UhW6GOudxKAcJJrEdEW+ZmA4JNrg/jRgx4hIQT7/RDhwl2DSOzZs30z5b0WOPPdYVfq5lOvDvn6OnEZprCBgCWY+AMn0gxXTMrFmzeMKkjDVZX/BKKCDGbBl/cQL0WbB7txWlLChtESlpDtc0O0BbalAVnen8+V77KWG6zz77LG7fvv1vYLJBWK0gIqOO9vk4l6xduzYAyevzXbqhuSVSfu19ZAQ4X+Nr8IUXXtgbUoyc9+NhsEaO0L4YAjmIgB740r1792Vt2rR5BxBU8x40VhYSjHXS73AAwi6PPPKIbRiUBcj+GwKGQFgEfC+0wsZiLw0BQyDVCJAYyYeE2cz/+7//42miYdU5169fH3j0xnRc9gAAQABJREFU0UdHgfHWEH6K3CI87rzAP9PJgzHs1VBPHdSkSZMAJNiYlsRBhp7aewFRd53agWOYuBMxj4aAIZBTCJDpA2m2QqiMFkDi6iIWHmNNTmFQEYV143sRcG2Mu7dLI+rmCsZvmUv22GOPb6Fq+BrDYFz3zezSueKII474qGvXrtMZD+aJqPE4abYAbLMd+8QTT7Rn0q4MDG6XTwSAnTBTZ8+efSEY2NXJGIjGYPUZvXk3BHICAWw8yKY03L9atGgxj4XGujdi2blhAC2P4q+++irwyiuvnIfxk/3Q1N8jImYfDAFDgAgYoWztwBBIUwSUEII65004oGAu1TkhGVBKnZNSDFhwt/jXv/5FKbMAFuG+S4N0uOCo1r9///Gnn376aD5j8f63RkR7Lzx9dMmSJdtdc80106CiQkPbvg9c0PjMNQQMgexHAISJMH8WLVrUByrnHVBiGzOSrHZlssCUwMVQXaoHJlchTvqMKMXG5CCJLIyw3XfffXYSqqKSc2z4SFqI6wWYEhAJuWiCzWQAcY4CQ7D666+/PoCRJDJHSeI5/gPcuF4vwkESjZcuXXoK4VCJ0RyHxopvCPhGAP1JpHCxYTANh39x4yE/msqoHiyzYsWKQ2AGgTaK7QAE36jHFwB1Qbs5Uee1+GIyX4ZA1SJgTLaqxd9SNwQiIsDdNi6s4f54yy23XIJT3TZjty0fDLCQ9ABVdhBBMQ5BGHjHHXdczWfcvvo108El+SBDr2fPnh/gtNHqtMcmL/GD/1QjLXzxxRdbOLXRAPKmn801BAwBQ6AUAirNBobA1pCCvYwfbcwoBZGvP8BOmCyrV69uBEaLqF+CKIwqxUZ1TswZBVDv/PuEE06Y4OogYeIFpglk7unbt++Cbt26rUJ8UU8ZZXqYWySP2KQ5c+7cubvjlTFbCYzPC/Uv9QaJwEveeuutOqjbmAxWn0mYd0MgZxBQldHjjjtuaefOnV9iwWOojHLDoIgHIGA+u5j+bT4jCim9OFeQ5qFZGpE2xP+E56uU5swiMwQSQMAXMZ5A/BbEEDAEkkAAk7gwzZo3b/7pmWeeeSUmeUoPVNMdNyfGLinMmDHjBlXnRDhffVsnNLg/QpptMOzAFfOABRow1+xjJ08ZegMco803Q0/jMtcQMASyHwGPNNuZGJ/2RYmLIQ0VlTGU/agkVkKM6UJs3HfffVdCOnD7eJgs8CNMsaZNmy495phjFjNlJS4TyYXOE9iAWQ/bbA8zDtSxpBEpPjJbKYENZus/n3nmmcH0h7JE8m7vwyDg5vOiN954ox3uS+gFdWH9KAxW9soQiAcBN5YJQ+fQQw+diDEyAJvE/B8tuKyrFyxY0Bf22VrBox2AEA2tOL85qTUCT02dYmDb4Oeff67j/pMGiVop+G6XIZCWCPgixNOyBJYpQyDLEVAxs4EDB07o06fPbBSX9o5CaqNcGGy33XaF2N2uBYm2+wgHFuWJTP6MMx92e2ZdeeWVF3KxAcYaj11ilCSmaMhankEwXweiSVTA8MLGEUHFfgwBQ8CLgDJYYKC/ALv/N/EbT0d0i2qvV3uOgoAyWSBJ3AlMFlG7hPeYTBba12S0ICLHu+iFqHTPCTnIi2y8dOnS5SVIyG2CumoB1FZDmzHhIoUfmSNgz+j0//znP4fCjzFbwwEV4R0wly84gOhqSARuA/tQJsUWASt7bQjEi4Curc8999xpe+655xKEkw2BSOGpmk9pN6y1aw4dOnQk/cVgykWKyt47BLgWwCVVAU2ai1AXT59//vlLsNn/xhVXXDEC5mkawyvnF6MzrNUYAoaAIeAXASW4uHOx1157/YDwQWdQmQNrENJbtA8WxEmbE13cMYkL5y9rHMUIbv299977R+Lh7LMJRpykcJNJRhXTm51/37s/nnQKMNmRocd0BH8+8wZDT/7jUIbX8V8uDaf/s8SVdgZ7d9egPEEwNkM46POJJ544w5U159pkutWxtkG4NQ4++ODPWWdU76Dr7iKcsBgcPXr0scy7SVQRhYiXtGcMJf3gg4z2UNvnfz83xyb4L6pXr17w7rvvPgvPvKy/lOAQ89e1axnL3SZLkEwWBIxaDzo/QB3qA8SxHRPSPhIz0dgehOAZMGDA44wW+YnZPjTPmMcXaPQpzI9GmXWujlOTJ0/uBiPtUufoj5QejFr/4b5j3pJwGB9/fO6555oRLPTxSiFeta5BNNc8/vjjqWpcag1TNr+U1OS7Sy+99B64vGzMKMEh3K9gA5Vwnh7MtUrE8UHnxAMPPPBr1EltRqZ1Ey7iHHgn2F133XXXEwqlN/gc7ta+B2neIPpkd4ePtU0HhB9H2x3cfwwePHgcsC2HOca/ZbCDt4eLt1LGKj9lML+GQDQErMFGQ8e+GQJpgoAjVOFU23DxxRdfgtNAiyClkKcSBJikeNKbEGJgItw0b968zsg6Jyxfkz/T4aIbbuFtt902ACpBv9GmDwi2kErQpk2bCrjQePzxx7vC7zBCBP+5vlAjDHYZAoZAGQQ4NoHoC4C4Djz//PO34ETkBvDi+yTkMtHmzF+MrVynBSGlfP60adOOIXYYk2OO6zArIBjhNND7Eccm/Elaik0ixA/GfXkEA28MpNkKIU0NnkgB55uIl8tzEey6dRk2bNil9OjKFjFMrn8gEQrJT55iSFXbO2CPj9LkRZAql7k+1/Gx8hsCySKAviVrW6x3x0M69ytK5jpmdNio2fewYVAEcyqBmTNnDkX4evBoJ42GRSvyS45tuOAEq9944433we70hcC2mJv4YHQGaXsaz1sw/u0xZMiQp2EKpzViM3uekSG1L2mIgDHZ0rBSLEuGQAQESMTk9evX7wlIkY2lH0xE3LGUi6pZnJh++OGHACRGJuCwgp3xwTcxCwKKi45qO+644xc4cbQf7MGRqKvmJaLAZJNF/v3333/j1KlTT4B/zpg2nkhN2I8hYAh4EeDJbFg4F86fP7/R8OHD7+Y3jDNcYBuzwAtUmWdgxDG1aOHChc2fffbZEWBmBYAjKZMyPkv/5aYI/OSBCfbhZZdd9hS/EuzSvhL/p3PEscce+wYkYkSaF/mi1GjEi8mDeM2jC7XXW3DiLG0aFamkVsSAOfwBc6owU6+++urrIHm2D6AojIfBmsOQWdENAV8IkNGDANyA2HD44Yc/yMB4Dm0qh4sM4zAPAvsbmx57gkHU34WJufERLq5cfQeMhV7AvHb4Qw89xIN8KIFZDZv41amWi02iPDxv5RhtrXCi9r+IFdcNuYqZlTvzEDCiOPPqzHKcwwgooQTbBTfjFNBlZU8B5cQEZljR7NmzW8NmBNUcOSklImUmCw+ojP4HNtpGIxoethAiopytpWJKp2CCvHv58uU8NY7fjWgGCHYZAoZAaQT0JGRI2va+8847RQ0VC20jTErDFPqHsb4axm4yywoeeeSRh2CLrS43VdS+WchjmAfa0uTro48+OuVSbJoc8iZjPQ7kuR3SbJvjkWZDvqpts802RYsXL95u0qRJDzAuJ6ll84YC61zHfCyE5N/Bc+bMuYGvwci0/lIGJ/trCCSLgK6rITE14aCDDvoa6+gCblhHi5cSb/yO/jkYG83H45Eb3tY/CUqMC3OHbB4B9x3Hjx9/14YNGyihG+T8UDYo5pXqfIeNptOwMbM3HkXbpqw/+28IpCMCxmRLx1qxPBkCERAAUUriKR/uxl69eg2GlFmw7CmgkLjmRF8MImYgjEzTZkSx7hpFiDbsa114gKE3FJJzL2MCpNpoiNGGHfU82KUoxMTXHH7Gwb9MkOqGjdReGgKGQE4igHFJ1EZZeKiN3gOV9r3wWIgFtxArOQlKlELrmA2bVLc8+uijhxErjsFRgsgnqjJxDsBpossuueSSJ/lSx/JYYf18JwMQ/vMOOOCA92HjazLDQhIhND9EiotSIPhWhPnpMNi7vJn+tKx8tks2xvIc87HWww8//MBHH32Ux7mXEh6GjyFgCKQWAYw/uq7+DuPmPdhQDlDdHu8jJoRNI9kwWLVq1VZYZw/HGFsXnk1tNCJi//uAuUP+XH/99VfPmjWrDQUDSE/8z8f/nrihj++F77777jZQmRd7uo5J9z9P9mQIpCkCYRt1mubVsmUIGAIlCJCQyYcB6edx+s5FfAXiq9QpoNiFC6xbty6ABfrdn376KW0Z+JYy48KDkxncn0aNGjWgc+fOtM+W793h27x5M+2zFeHUsy5gtF2HdMTQAvNklyFgCBgCXgQwTuWRCYRd6RqwgTMFhEkdjDFktNlaxAtUIEBmWtGUKVNOfemll0QimVJMwKu0rzL/aKOTTKxWrVoFzj777Oswdv8OLymzxVYmuQDqTV7hNLj79t9//x8hWV2AfEbNJMsAP1LfsGl0E5hJNDcgc1rZ+HPxP/ARCUaWHQzWh3Aia1swL01NNBcbg5W5MhGQNTIYP/fgZMuFSFjmqmgZwHiXD8ncv2fMmNERBycMpV+MuZE5c9Eiy51vHPuL77rrrstBM1zBZycYEBEBnfcAbdS5JWIE9sEQqCIEbGFbRcBbsoZAMghg0hFRdpzuNhHE1EuIK4+qRBon1UYpZTZ37tzdYFB0nL7nAl6f43FBRIm0Qv369T/DyXaDQBzJDh93+nhx8sM7iXP69OnXulOAJEw88ZsfQ8AQyC0EyAQi0wCSbLvD5iMZbVtznPE7NmUraocccggZbJQQ3vuBBx54xBm7L45HiglzAAnFAGwLTcAmDE+HFsvSfFcRl5sf8qEuuhLp3cg0IHkgc1O09FgWSGYVYwMogAMdJsFGm9hnc2WPFjTrv4GQlMl10KBB18Pm6akocDEwZZuwyxAwBCoWAfLIio466qh7GjRoEAATDUvd6GQy1tpUZww+8cQTl8B0yrl45vhHaV27yiNAMIu/+eabVpBKG8LP2HQjl628T/eGG0c0NdG6desgbICS1gm4eSdiGPtgCBgChoAh4BBQ4urnn3+us9dee/2A10EMrBx1uWsROlIbi/iJLohNYAACE43M/mvWrGm57777UmIh6NQ5BTfu+uCWo9xHjBhxrcMu+orBefI6Wj90YaNNjojHxPg309Mbu3mSDmwArcbCpBHDa/74nKGXtDOoNFGShEZZQ2XW5xNPPFGMfuO7tckqrmRPO60B9bXPWWdgAJPpoO20qE6dOkHYBBOVAzO4HrXCpD2jD/cjfiA0Qm3fg6fi6ttFfAwjY8ZVV131kMtJXhaMGa4oiTnKZAIDsgnG9K8QSxBjreDE52g3xiRp6/vtt99P77zzTlvmoDLw9PS7rY4//vj3mEdKd0TLq35Tf5g3lrtTZwM53i+l34G5ekajRo2kvjGGhdZCiluiLtqIxIXx8UccpNAM8VRKG2E62k5gx7Um2skqvvKuV/jfe1NFjP8hzXcPXF42x5bgEO5XsDnhhBNkfYZ6jjhm6JyIA0u+Rp3UZmRaN+EizqV3DgfZNMa8NIbQYOMi5ljmNjeCu+66azFstB3nMLP26mk8wEXwAMb1u3fvvpzYKt3A50i3Ex4IwmTNKwircfgSFvBkwx4NAUPAEMgtBHSCNyZbQvUuk82ECRNOb9y4sSysvAxKnfw7der0CyQihPBCKskw2mphIfc+4ghCUq7U4gMLZvmPk9B4UAIv3+mUBEubX5nQjcmWNvURNSM6jsA1JltUpOL6KG0fTJoKYbIhB9xI4cJaxqwrr7xSx4xKI/rjQqESPSmDDWr+9XGojYyxZTcziFu428u0xMnSl7lsSx1WUhFkrIfa1JFQVZU8xssc0nnjrLPOmo++K0R/jjLapL5oRxWbjX+ynqMxocK1g1jvjMlWSb2h8pORtmNMtuSB140JbBbvTEYk+1Q8/RCnYMr6t0ePHiu//vrrli4nlTkGJ1/4CopBMcX4ngf6YKLDtBT9wHdlb9AvsimA8fAPHK5WaRtHFQSDRWsIGAKGQOUjgIFXGEXGZEsYeyFwrr322vsRA3eHttDVW3eLYND1U2DdgKnopMdnH5ekQ+Oj2LETqQldtCMOSrswTSGab7311qtdvJnMaJMFkjHZfLSQKvSq4whcY7IlXw/S9jFO+GKyYQwo9jL5kY3QOBTuGdIqXETLWALV96Ga7QTHJw2eca6XwQYGk0iDAZuYRAgKKvjqbj8OOpiA9r81AdD+UIlgyDx+zTXX3MfkwWSLKE3D73pT4lrLCknpuch3LjLapL8tWrSoC2yf/kJsdN5WnCK5ZFaTUakSSpH88b3O1ybJBjSy65L2Y0y2lFWq4AmbYYMQo6xr3fo2NG6596X+16hRQ8bsU089ddlPP/3U1OVG4nLPOefoXM75CHbraLqGmBXFwtN9l7UB7Ldd6oCTOSbnQLQCGwKGgCGQKAJKDBiTLTEEFT+49SAB8QFiKbdAV2kB7CKRAOKV6GQlC4YxY8b0c5IopSZL3fGj5NzSpUs7lCSVsRJtUlZjsrlaTHPH0w+MyZZ8XUnb98NkI7MEyeodt4qbl9GG8Wms1mMOSTMVsLpeeOGF5lCj+dhh+HcZPBXXci4IO2FmYRNlDbCrxbiUsOFzZV2u3mgDrtp55533LNItJ+3Md+FuElRgEgmB6mW0KfOxsspQ2ek4zKSvvfzyy4fx8AjiQ3uq4XAq+y4MQztqvzMmW2XXcKWlJ23ImGwpxVs2iJ2UtTCyy/a/cP/BHJdxDPPXh7nOaMP4JhhynPMy2NycH3YuUExVivvMM8+ch/BVtXGU0gZlkRkChoAhUOkIuIVmwJhsSUEvi6wnn3yyR4sWLbjQLvZOZLor1LBhwyDVUVxKEsZPqlpXcAvOOeecWQhbbvGhaqSwobBA49Zw+j9DXMHHmGyZUVvaxuAaky35KpO2Hy+TTRlCUBX8rUOHDqLqhvFHdqGRlaiLaX53Y5UwFnBi8mOsQ1cEYUAlX5z0i8G1V8EZhv/bwwbbfx0WcTPYlGnSsWPHP3HwzNGulELYVEWJlbn33nvvtQfDSCSyQCzF1Q68jDaqjm7atKm+K0NWtgFX/7LZNXny5JP22WcfsasaL4NN53fO6bBb9rA76IJ2WCMy2rS9mCRbVfSOCk1TxhFjsqUOYx3LaGMYGxhiQzBe6VIPo+2Dr776qoXLVZ7r86nLZBrHpPixzF4GWzxmBHTOgJroFqiJ7s5ianxpXGTLmiFgCBgC6YeATjzGZEu6bmShBWmQuxFTKUP9/K/22dzhBDsztUQmLg2DxcNuMLL9G+NWCTY+8wbBJAQz/A5TYkLrGd8z5RI8jcmWGdWl7QuuMdmSrzJp++i/camLgrAvJKMNqoJDNmzY0OKwww77BlkIqp0aPse6vYy23r17L3rzzTdljEK4Aq1bPGfFpWMoC4NNjxNh+0cZUiIFgdcx8XKSxOIf6jRXOGCqjMHm0qcjbWfq1KknwayAlEOZO/gWtVxktKFcMncceeSRK5999lkhsBhnNrUBr5Tm0KFDB+DkPGGMqVRiLJzY1xQnqAg/Dv+BYcOGXcCDXfAYUQpO68GYbEQsqy7pc8ZkS3mdyni6bNmyPcAE/xWx8yCauDYNvKqj77777l4uZyLpm/Jcpl+E0h4xZufDjM2DxA13UTwMNvXDzYPx48ef6YqWqOZN+iFjOTIEDAFDoDIR0MWzMdmSQ11xhFsHROrLiI3Mr1ILblXJwclJtN/GK1GiTCY9HLhwWpMmTYTQ0511xBk6HbZevXpBEFsnSEqZdzqYLBSMyeZqL80dT/s3JlvydSVtP14mG5IrrFmzZhAM/quYNJgjR7Vv314kc+JlHCCYHIYARouMJ127dv0vVCgPZ3y89HSykn+Z+evaqGDLElx22WVD2rZtK4wnEG+lxmp8jsiQcswowQlx0A7bVoxP+wCfq/iS+UHts5Eh5JiCEcuE/Mo3MpCwISRl40mpU6ZMOVnL4mVO6btMcr31j+d/QBVtLOZNrf+4iHfihLYi+EC1dg7i2YYYQFrkKvZBPEZsR8ZkI1JZecmYYky2CqlbWSPfcccdcso8UoiLWQR/HMekL0K6+y9Iq/bS3Hk3WfRdFrnSFrkJ369fvxeJA+5iZZ65/zLmlX3mvIZ3ghnwvgnPvIzBVoKD/RoChoAh4B8BJQyMyeYfu7IhdPJes2ZNS6gfiZSZSrDBrx5OIIv5ESNG/MuFT5TRJuGwU3UP48YCXhb+fOat6R5++OFrVq1a1callUkTpiwWjMnmai7NHR1H4BqTLfm6krbvh8kGhn7whhtu0DElMHHixDN33313GQvKSroie/I+nEsmC/zLWNKuXbtiMCIGo05VZTBjJZq8DCKoU+52/vnnv6Dl94MPwygT6oILLiCTRVRrdezH9yq/XF8UqQ1IWj2FDLG+RdrRPUesf/2ujKTddtstiDhuQ5zV8Y1XRrYBL5N4/vz5rU866aRFKAtxKFLml/sfFRuVDu3Wrdt3f/zxRxOEkWvw4MGDjMmmaOSca0y2iq1yWetC6vRmJCN91rup7N6F7beqYtq0adPgnXfeeS3GMbEvhjDZJtXGtb3g9Pbbb+8DjZlPiQsYZ4W6kRANJ34DVnJoW9++fV8BTum2cYQs2mUIGAKGQIYh4BbkZpMtdfUmE93o0aMvwOJdFgRuh0gWAUrQQUrgF9rOYbKJEGhab3DrwP7aS4imnOScisyffvrprzEdXJm0sDAmW0mdZcSvpz0aky35GvPNZANTJHj99dfrqcLCEIGk6wU77rgjx524drLhT8YouhinZEebYxjsTb0xc+bMPT3FyhhGixtbBU/m/9///ne/Ll26iIF7/C2MZ4cf/kK4gMkihAhsYr6GNr8D40xk/Ga4irw8/bHWRRddNBtphZiDfI7n1rmKfnv16rXwpZde0sN08CozmG0Oh1D9g9C+QNWDQXz+DQm/iDbUymKk8ymkRDc///zzRxIEXNLX0PeMyVaCRy7+SvsySbaKqXrPWFYNm64TkArHr0Lvutq9CzuuYW4MSameffbZs2DnrbHmNB3Hbs1bPG7Z8W3UqFEDMb5tJB5g+m/hphmfY92wRSnzGub61xGnnDCtuMeTD/NjCBgChoAhEAYBHUhNki0MOAm8UjzhVtfDCdQQK6KTyU53w/v06fOaJqHh9H88ri4QKBreuXNnsVmhEmwITyPM3MkSqZRbb731BhenMAHjib+K/cjC1STZqrgW4kxe2y9cY7LFiVkUb9L20b/jssmGeAq9TDaEU8mzAA4yeATfqQr6d7xECf3zdgwoGT/23nvvPyE1OwL1Wxff9EpbZpsbG0PMlRkzZuyNk9JeRpmkbGAgxX3AAQorYZTJgg2Sn995552OBMErIaegpIur8wPqbPvjjz9+NfIlhBfdeG9KjOgcglOr/4AKKiUb/6llZPnxP+0kpF2eQvX/yiuv7EECG3UoZVcJl3hx0LrfY489fsdBGYe58uephJwx2bRF5KQr7cyYbBVX956x7B+Y0x5HSpS8krmJz7FuN5cJs23PPff8bezYsWdijNDxIS3HsGhouvEttJb/9NNPW0M99Hm3sU9sIqqtl8VKD0vr2bPn8nXr1jVz6YbijpYP+2YIGAKGgCEQBQFdIBuTLQpIPj8ppnBr9ejR40MELzfpgXCRCd+JwDOFRAkVlZzrR0Ib8RR5iWllutFw7EcffSSSc/CTCROoLICMycamkf6Xp80bky356pK2D8IiISabl/GBeqkOdb9JyJIw2vxI7jAMGfUYV0ILdhyq8Pnw4cMvRLxii8oVNS2IFLZBR4yFxjcYzW4OouxeEFZy6iryS+k1GXtZvnjvWrVqyU4/mI0/v/rqqwdquZ2bzo5gMW/evANgwkAkHLQs8Zad/rxEG5gJHz7wwAOnAW8lUln+tGkDzAszxAtEY33YQL0T9bYZf1nfhTonuv8x20AEBpukoUxWY7IBzdy9pC0Yk61iG4AytDHuNMSJo7pp8Fe80lr0h74fmsugFjlHtUlcztNiDIuGomeOE2/4v+3IkSMvPeSQQ9bhhYxvXglk9y7iGKcMtlNOOWXlF1980dqlHRo/3X9zDAFDwBAwBBJBgIM2wxmTLRH0ooYR4gan13WHXRuqpBR77Ujoc/369YP042LyPblp/cEtwE7Wc4gnZJiZz7yVQHInmzZiWrozyOc0vQQLY7Klae2UyZanHRqTrQw2CfyVtp8Mk41peuqkYMCAAZP5CrcvG1QujEi1qUQTpYFA5CzniYpIQ2ySwR8vjnmVTagoY63U2Ll8+fLdKHl30EEHCWMJ+eI46Ft6jYQZpd4YHhsVXgabjO94nwmX5HXRokWdIYUneCQiyUdpELQBIVLr1q0bhBmC+Q8//HA3tAFRmXRA5Lu5JdFNI994sp07ZleoTriegY3CK2A77QtEKPMgmcXxEuQaJhqDjRk1JhtRyPlLxh5jslVKO5A+zlO0cQLyZ0gx6NS+pY/zf6zbbbKImjil2mB39N8YQxp4cp/HMQX/K20M86Qd9pH5Kbtmh8r6Yd27d5dNfAQKkmHmZ3zzMNhWfPbZZ+1cwqXm0bCZsZeGgCFgCBgC8SHgJhNjssUHl19fMmGB2LsXAcvZxNEddcf82pmRl51I40lQ6xBuzRNPPPF9pqUTKJ95K6GIXf0xLs50t88m2BmTzdVWmjueNmhMtuTrSto+xoKEJdk0CzqeoH4KBg4cOAnvleHgW5qLYaGOwnDCaMEYQ2bbJ5DiuYmHCWiaziUxVMD0tW2U+Z7oXxm3XLlCarGMDOlshVPkDrr44ovHQ33+Z77iDaLqbzKI9H+8LiWCQbRIWU899dT3KA2GsLwykRCRPMPof2fYV3sHZZCyxXvqKP3rjbmEmEj7ad68efDkk09+49577+0N/LfDe+9VEfXP+IXgdAyuUnUBo98tccru8EMPPXStSnSTCE+k/mnTCGkFy6iIlkrPmGze6s7ZZ2kTxmSrtPoXRhtVJGGS5RX2Udy+7I6SGYW5TMZ2hofGyXKMYRd8//33O3lKQSZbZW8ahZJ38ybLWmrMgUTfEeedd94LLVq0kDEZY3gi0rkytkGCzctgE1xDGbAHQ8AQMAQMgeQQUALIJNmSwzFcaMUWbt3evXu/DD+lVK/4nwQgXTC/7ndxJDrRSbhnnnnmWEjOCQGERUSIsHQER9H2228ffOyxx05xaZWavN27dHEkb8ZkS5fqiJ4PT1s3Jlt0qOL5Km0/FUw2Juapm/xx48b1b9u2rYwLykSgFz83CRS3QRAiUvbaa69NsDH5NGzdnPzJJ594CRVmgRfHJzLFRNJJmW/Mm8ufSg7If31Pf46hRkxKMdXwX665c+e2xDhxNRhhi1u1ahUqC5grvg82QIQSnsxEMmf4HyeRzkJ+1BZdOo+ZJYBE/pW8syxgRL7IslEyDeUMzRN8F8/NNuCYbRKWkm1HHXXUp4MGDbrzhRde2NvVqTcnrN8CMqW07vE/VOdej+5ZvjEe+neqYsx/Ofxhk7TuHXfc0QM216ZC2nAT/GgZfBOfDOvKJkRohw4dvDbYyqVtTDZXW7ntSLswJlulNgJZ72J82Apj/2T2W9y+pbQ59kHCVfo61OiDkPT98fLLLx8J0yptypSG45F37CrzOfm/HOvcuKlzZShSvK/7xBNPHMFTsVu2bKnjm256hf4jQNRn0gFaXmyOLPeoiAqeoQTtwRAwBAwBQyB5BNygbpJsyUMZNgZHIAZACLSATRwhAFSCDQFI5MjigM+33XbbVS6SRCc8WezBXs55WDxIvC5+mXg1Xezyr1+yZImeFphoWmHLm8KXUhZjsqUQ0QqMSscRuMZkSx5nafsYO/ohqtDhJXyOcJc6+EAJf282tH74Dov1kzt27CgHpYBRssU7RkSIP2y6ymxD+BCzrXHjxsEDDjhg41lnnfUkiJUr5syZ03rFihX1vHlJ5hnlyFu6dGlDSKwdDMm8ESAU5oMR8heYYqE8UkIhEcaRlt1rgw5Mo4eQ5lYuz1IvyeQ/DcJKGVCmWsBvsitzkc4N7n8Iy1j/Pcy2kGRk69ati8BweAPx3zl+/PjDvvzyyzpxlJtELOci3nyOeCHvBW+88UYTbEz1PvfccydAJfjrZs2ahfLM9kgmKSIIvYv3mRJvuvEFQ+DLwDA81GUk7Dypfc1sskWsrlz4IH3KmGyVW9W6tsZ4UB3rxIeRuvR3zGm++z7GfIYJhcNa/VdIiz0F5v15q1evbhSmZKzzchtGYfyFfYU8eyWyObaE3UCCSuj+sKl6P7Rd1uy8886h8YxzlN9520nzysYRpJkXeA45yIZ5LSzO9jK3EQjbqXIbEiu9IZBdCGAhwJ3+PBCfq++7776r3n333XF//fVXABNkoLi4WG4sCgJ//vln4Nlnnx0MtauXYaR5GcPgZti4L0zcxSB6Av3795+EeHpOmDDhOBKciFvGGqSbBxWvQqgM1cdR3/fBf1f4L+aET2Ip7oTMoyFgCGQUAuzfrp9Xg1TttNmzZ/+A8eEeSL7ylMxijBOBLVu2hGUkRCoo4gtwTEHcAaodYhFfhM2EfEoWvfnmm70gGdALpzreUbt27fUgWOYXFRVt3GmnnT5v377927BF+QPGwL8KCwvzsDO/qUmTJj8xHcRZsHjx4gabNm3Kgz2saps3b94G8TXFeNYFadVC3ttATajTH3/8sR2Yd96sFYHwYH7yUY6EiAaOyWA2FSLugnbt2v0OVZp7b7rppptRvi0k6HCTCMv0q4hlQZl+QUH6wh7R5oceeugi4B3AqdeFcH2tS9kGML/ksw2gDRWjPoMrV67Mx30A4j8AUtVXg9H2LU52fQffP69Xr94yMEU/BlNsHVSzfv3/9u4FypK6vhN49zx4ykseziE8N7IrKChBFI74mkUJoDFHMUhcN2sGUQ8qorJgFoxgiK4LxCyIRg8HDI6a3cWAUV6SI6A8FB/Asu4Bw8jyGhAYniIz04/9/mpu3dzp6e6Z7p7p6WE+dU51Vd9bt+pfn6r6V/1/9a9/5TGtZ/LbbuGxxa199dprr63tuG32m60zvz3vuOOOAzL/30+TCPvdfffd+z7zzDNb3nPPPd2fVOF6+fLlszN97QPt52s8zP4zlG3fFHjf//73fzu1Pt+XtC3JDCodz4dtv8YWJiQw0wXq2rqTl1Xg6H15Ic/9ycs+nfNFc52bc8ecyp/WpKvjvvKwOo+lH8rbo7dK/848+fHOXJc/WY+l7r333lfMnz//ulyfP5ZpqzmCviy/mX07zD+Vf/TeJGjHexNS1+nt/+2wrsNn59w3r9pHy02EI5Ov7plH3w+v/LRZSP5UHlfnt6S3+1n73XjDnEsH41G/mZMXPlzzta997aikoc4B8rbx4Hy3QQtM6GJmg15TiZ/xAk8++WQVcMZMZwWEdJMTiGtFsfpyZ/+CW2+99Y9TuP3D3uBXTqbNRUFO6tsk+HVuJn9zpl+64mfdk/FqF14n7s5Fx8C99957Qhr/fkPaqNkyJ+ahWkbNoC48chExmNosh6RNhzOyjE9V2nQECDy/BSp/yBpWP/uII464Lsf+/Nwl/7t076ygRLXjmPxhbj6fEERNn8BGf/o5FahK3wTcck7pT1/XOb+XQsN/qJmm0NKXQNtwzidLM10FZWbn//tTI+2BfDY7ga3+FJL2TrBn8yrw5CdzMt+5IwJqNau+1FYbyDT9CaxUu29V8Gg+n8yfBNeGEqDryzzmvO51r3vk1FNPfWca1r4u+WlT4yB2z5sTYNapKZzW8KyzzvpQGv/+59wAOj/nnx0ryFiW2R8mdFKofaANuHa2/1C223AKjHPS73zzzTf/cW2XPfbYo+973/teNvXQswlqLcnjxQ9n2/8uj5v+Jl83NbsTPKu2Rbd5/PHHX5BmLOZlvlsngLtp5tPcjOrZvvWo11AnsNafc9ykrqlrn63zcW37PG68LOn54plnnvkX2eb1RlqF0B5wowRmkkDlYcl7cqj2D5922mmn56bRLeeff/4FeQP0vBzXgzk/zMo5Zo3yssrDato6J9W5p2r3Pvroo7PSb5Pg11Hz5s076sILLxxMHnH7Bz7wgRsy/XNvectbvp1mF+6v/PLQQw99Oulobhatzmjx4sU75qbB5pl+s+Rr+6VccEhqf784w3+f/G/TRYsWddOc6/eB5Jez6jyXPG5CwbXMvy955EBd9+dGf19ql5+Yt21/NZ/X25arTODmweo2lu83WIFJXRBssGsr4TNaILUN+qugMVYicxE61lc+X41ATmjd4FcenTn+9nSp0bZK8CuzGU5Q7HUXX3zxQRm/Lm0MTfgkWBcd+W3/brvtdvdFF13056kSvjDLTHl0znBdQNSFRLom4HbeeeedmguGn+X/S9MrTJSMjsDzX6AurKv20ePJD45Je2qXJS84/xe/+MXW+bzatelPoaHJIyZKkcJA1c6tgsqcusCvvK+CGFXLLV1fp9BS896snXcCaL+f8erH7DKPal+t5tcG1apANCf9mL9Zky8qbckbB6sGXIKMfSnoLEyA7dQE/u7J7yt417TRtSbz2pCm6Smc1r7wv9Ku3QMXXHDBWd/85jerBloFXAdS2JvwNWqdX4qsPGs+8W23fxN0S82z2vbVv6DT75bhmnZVW7ECtFXgrHPZrATGJrWftgvMvj5UAeYK0OUx5yfz2NnRCfBdlaYbmrbg4qQQ2mIZEpiBAnWOqTwnXV9u0lx+2223vSkvMfhvdTO7zkcVLGvzozVNfs5V/c8++2xzDquAW52/ci09u/qcr6qpler78lTIiQmCLU0+NHefffb51XHHHXdLfvtsRelybqqa2lXLroL4myZ9Vct2boY7pTbZy3JdvkvdJKigWmrm1mTdLtM3N5CS7gqsTTgfrhlVrbf8tlmPPG76L6kF/hdZ7v9M7eW+5GtVM3vM8l43IUYIbMACkzpwNuD1lfQZKJAMv6Iu/Xm0Z0ka1bwmd5yPqRoNTz311CZ10srFbD1G0vfa1772nxYuXFhrMLFqDjNwnddHkjontP48FrUod8OOzWNIX09ts1k5eQ9XgaGs0w3kDtfchx9+uAq7U+lqG81KQ9D/45Of/OTBn/3sZz+awk4VFpo8py4gKqD62GOPzUog7uwlS5b8PDUJ7u1cqMzI7Zu0TcXDb6dPoDaUjTV93pNdUvvYYOULC9P21L0J7p+aN2i+OYGwukAfSD4xu/KmyS6gjtnKU6qgUwGxmk/lc+lX2j+qEFPBmPq6psm07c2A+rfpMp85KXC0/055WOlIAWcwBalZCbLMzvntN2nf64TKM/NdFT4qeNM8fj/lhc3QGdR2qO2TblZqYdyU8Tfmpstp3/nOd05Mu3dbVkGvHCYbcK3VroBrZ/s3Qbcsq7v9a/nZ9s3/NWy7mr7SVcM6V7Wf57Mp1VZs51PDOu9mmVXDe3b29b4UPi9JbPXkujmVr9vgqkJoL5pxAjNUoPKSyjPSza7H0ZPMw08//fS/rMdHH3jggRzqs+tFNhX8n1BQPvNsa7d1bxpV3pHlVA3avrvuuqvOa1sUS9pu2yeD6ifaNbXmcg7spi957qTjA1nXeilNPR7azCMvJLo65/Z3J82PJmH1ttQ6r8nbJrqVTE+AAIFJCjQnntzJfkdP45p1gV398JFHHnlnHt/ZqeZdJ7Ia6iYt0Fgn+PW3mUMVLNu32FVhdziPcd3ZvkZ8KtbtbzPc7t3vfveVNe+qNt5ZZi13OBcdTSOoqUL+N/m/ugldgKz4yTr725S6TjnllJOyhO5bWHvH09DwP3aW/q8ltHWWHDMeT6Bnf9syj9styrTN3d8advrB1JYdzmNpR9Z82gbDa1y3ikCzPycwf2y+qQBUc5zW+Bj9al98sMoSOh90tluzvBpPoeQ9aUj+kXY5acul7gCMtdwN7vNal04+2OS3aSNsOI/MXpxHE3dvjeoufzu+EQ1rnZtz+9VXX/2a1Hr4Uf5vtm8F29JXoWyD294j05wC8lBuMHWPp9ReeziPS/9Z9v22UDuhbd/mY158EOmNt2vyTy8+mBk7QG/+ncc8/+Ctb31rtXHc5F255q0aYmstL8u5eajtq8Zczi3LE+Bq+uSZy5PfLK/r7Bpvv9tiiy2qVvZg/a7SkuFayVfr3JY0dK/xqyyRR2f/NHlb+xjShPK2mbE1pYLA5AXak/rk5+CXBNaOQJ10+hcsWHBJqll/JI1i/tdUZd48J4e+vGXn/+QC8j+mNlu1mVKNg9a0ukkK5IRXd8H68jjK6am19uLUHDmiGmpNA9F9CU5cdfLJJ390xx13XJzZT8m6Trh1sZHh46kZd3zaffhFHkXdKrUUB1M9vbkozMl+ODUW+3Knb89Jrs66/FlT4EtNg+axsqp5V3cOq6v9ssZzoSLguy63wOTmXUHjCmBUI8LNdspFZNVoGUrAZlY+W7ERJzdvvxpHoGr+TLSrfCK/qe3V5jcX53GYH6eG64euvPLKY/Pozeb5bjh5RdPgctUym+gyZsL0lefW3f081tOffvbOO+/c9/rXv/7Gt7/97afnEaNr8n3hbcx3+du2jWanLbpqb+jQvJDiozk/Hf/DH/5wl9qGFWwro9Sy2OD2gZwrKlhdj43Vdfecgw466LfZ/n/3qU996qzkS4vzooO+Ol+mn/hBlBl2jqOM6QgQWJ8CdQyvuMzuHz744IN/nvFD8jTHsWmn7aQ8Fj+v0laBrqrFmnPmlPKy3t8nb6l5rZdAVgJ4zbktaaiafAPJ2xamLHdK8qWH8iK0WuVK26TytvqxjgABAgTWksCDDz642+c+97njcxfkj3KC2rIz2ymdjNZS0p4vs2ksY7tZHs056IMf/ODZaT/iLT0rtzatm5N+aqj8eR6Fae6Y5YS8rBPsGM5b/oYvueSSQzvLXi8XCD3r3TvapOXrX//6m1PY66Y7F0f12rjhPN48/NWvfvWYGZju3nXY2MabbZaC61/XNkq/LNur7uDWc37DCWjcmn1+q0LJcG3u4zXL51PXBMHPOOOMY7NSFZTv3p2u/0fpm5psCdCfUght7Zoan0jX2SbdPCB50+vTLuSVafC5u8wKtCRg0b4drft5ljPjxivwUbUFsv+VX1NzrfK7Y4455obU2v6TrG97h78JsEzE6nk+bXcfiNG8NCj+mTxOWw16N9u4U0NjsBNYmnHbvU1nDWtf7a25lkL3U5/4xCe+mMdhex/rqsdDJ5UftcdabkR+vM5JWeaYx2rcqpA7nALwkquuumrPjE/bfteuX4ZbpbH2OysdFXSu4Wh9bpQ063HCCSe0tdybPCnT6lYVaGzyptzL8tVwHR81HK3P/tiYv+Y1r7k/22KbmlW7bWpct/YEOq7d4zr/z8s58uz2OjhLqmNgedUm2xDyskpvb1814JL+7rmtvksN5GtyU+SAjLfdpPO2dgaGBAgQILD2BLonpZ5Zdi+6ez4zOjWB0ZzX+gVX7wVc3dl6xSte0S0EzJ8//6HPf/7zn8g0c2tVeqed2qqttV83+10eMfxQGmfvFgjqIilt2p3ZLmUGprtN2kY1bLdDakrOS/tW1ybA1r0ofNOb3nTvtddee2AHZNR9f6PCGn9lm0JbHilfkMnW6HHRXGwPpw2a99Vs24L/+IsY+9vUBKjjrluoTkDq8LTX+fcJtDyWz9ttOlQX+HWhP9MKKJWeFHTrzXLdvC4113qDa5v2rL1CSA9GO9o5lrv7QN5U/eLsj2eP2AcGO/vAjCmk1rZvC58JaHS3/9oOrrVO7bGWgPh/So24Oja6y8x4e6w0wzbI9oY3vOGR1BDcvebROdZqdJ12bd6cBta3SZDtV1nYGgXZ8ij1f+8krLsvrNOEbpgzb2yyLzRBtt79rpx7+54g2wPZJtvW6rbbpsZ1a1+g49stw6Q224F5QcE399prr95g6EA97jnTzmXRWGn/qfQlAD6UvKTymSZon3TXDcybv/zlLx+ddW1vHFUjda6z1v7uZI4ECBCYmkBPIUsBZGqU4/66ToLTYd17sq27XAsWLDgnb1H7L3nxwS7jJnAGfXnjjTfu/+EPf/jspP0racS1aderkte7bjMouRtzUpoLu2yXLRLUzcsa/+zC7GufrtqxHRQXfqvZO9qCdx7bf+NLX/rSptBed9vzs5UuuOv/TqFgoGporYP27qpg0t1eP/vZz/bOtjw37Vg9usMOO3TTkjQMtMGWCnCMls51+VkZZLlD9Zhyaq31FpyG05D/QNqkvHxkzbWkpx4N7a5b/teNItAx6hZQ8yjxv80LAv4qtbHuqcBlftL2VZuygq5rrY2hnnm3yxh12Nn+TVt7vYHV+n2Ca0tGq7nWHmOjrPKEPmqDbF/60pcOSzMPlb4xC+ptgCXNQtwX1+YJgenaB9vlZDg3bVT9vGxyzHZvXNX/vX3S2hxHH/vYx/4yn1cnyLbCYbS/zfFxzjnnvLf2xUwwXqC1MU+g9d5si3rDrmuY0UTXwWedY76b56c26avf+973Xpwbz8/VZuj0VfO52lAb8zjumbb9zTof1n5V59gsu3vM1hMeOZZvTN5TtbKrWYemW1t5Wzs/QwIECBAgQGAcgfYie5RJugWoUb5b7x910t29MOpN0Djr1DuZ8WkWGGe7jLodpzl5M35xrV+Gsw477LD/nQQPb7311isFj+qz6lN7pinQ5WL7/2b67Wvl2t/X+FS7zrwqj+gWsn/961/Pq7vm73rXu67ae++9uxf9mabSVIWUZVWA7wRc1notpwrkdYJqQ/U4cpa5UqG2Xt6TGlf/r4JBqbWwXzlmmrYTXGslJjDsFNy6jjF9Yb0oKW+u+24Cwavsm9n+tQ+0Qbe1ug/0bv8qEKcAutL2T+FzKO3s/bhuJKVt2X/Ts5rV5lp3HXo+n/Roe6xluF0avq+3GnaPyRrv7dMeatPUQd5k+g+dBU53ftise7VBWOkqu9709Y4nYN2kNV7HddLaPf47/xt0BNp96pZbbvl3r371q3+bj8cMYNZxUd/nscVzOj9fq/tjZ54G4wh0tlf32Lv55pv3OvPMM0/OG5Z/ucsuu/Qes1Vbuwm41fmmE0Dt/X6djdfy6sZaHaPto9tZpcpbhg844ICnP/KRj1xcTc0k31Ere5xt7SsCBAgQIDBtAp0LjGr8eYMqbHbSXRf61athOW17zOQW1Cl8VgGi2WZtYXRyc9sof9UUAhYuXPj2ffbZp7mYr0BbXejXBXj1CTBVcKEJcqXW4Ac6Suus0NY5BrvzzzadlTdRviJvAP700Ucfffm+++67fNddd12l4FFBkCqsVIEhw963qnXfzJb1aderHbZvXqsaas26dgo8TSE167rSclJjbSi1QxalfcvzL7zwwj9M2l44Yq/ZoPK7EWmfMf92juNuwKX+//73v79v9oHT0tbdd/bbb79lu++++0rbprOt6nGs2geaNv3aQmS7L4+2/Xu+ax5Nru2fedT2X6VWZ4K9Q+94xztuOumkkz6TF3b8QdLVvDCnA9fWGF9Xjo3Heeed17ShmIUMVvC7TX/tv2mvrWmXcv/99/9dT5tJ3WNpXSVsxHyb5Z177rkL8nlto2ZbdMa72yzBwCZomRp3j91zzz171jw6271GdaMLNLbJI0/P12VZed1Am1/XsN0HcgPgiTb428lTR5+jT9eZQO3PHftusC2fbVVtI+cR6a/k5taiUc5lg3VTp2qktsd2bdckckp9O68KqtX8k1+sEvzOo62DCeLf9IUvfOF9eYnZriNgnNtGgPiXAAECBAgQIECAwLgCufA/LoG2VS6886PhemwzgYXzUkCYtnYVOwXubqClEl/Lz9uL98wjq8ekvZvzE3S7/iUvecnypLv3UZwpFUZqMdVXECfzXpogwENZ1kV5pO2MvDnu5YsWLXpRpaWna2ouddLb87HRqQqMsQ/Mvummm/ZILcej8rbOLybo9s8ve9nLBrIPjKztOKX9oGqbZL5LDznkkEcWLFhwURrn/0wCffsnTb21OmoVp6Xw2e5fGc5JsPELL3rRi0ZdvzyW9ux3v/vd9faSoZ50zvr4xz9+UXwqnRUQrIJ9E9ROIKgJYiegP5wXXx2f76vrBiJW/OvvSIEe2016bFfZD5JvDXzrW996W+f3XEdCTv//bdtlK53Pnn766Z1ys+aI3LT5Ut62vKi2W9UiS/JG9gN5tHRZewOhbiK0QbPRhpmumjRobjrld/XShVHP6xVUS63Ip4499th/SK21v77++uurRnb3kdCkowkStvvd9LNZIoGZLyCDnfnbSAoJECBAgMC0C9QFdOdOed+ll156aN60+7lf/vKXL8+Fed/Q0FBfag3dfPjhh//Ne97znksz3VDv9NOR2FpeXrbQ1gio2i/dLt9tkRpFO6VQsc1ll1121JNPPrlDagDMfeKJJ15+++2375fPB7IOc9LXSo4MjjQ19LKew88991x/3m76RAodP8p0v1m+fHlfCh8/OOigg35Sd/1T+Hmwu9AVI1VYyuIbvCoQ6dahQDF39oG6nq1gWrfLd5ul3aNdnnrqqXl5JOvQtAG6UwqWO951112HLF68eLsUNocHBgbqd1ULqAkStz/Ob5dme/eloDqwbNmyTbOv/zjtDv48+9EmBx544PWpDXRDfZfA1QPtbzrD2amhUi/GadsrHPH1uvl3xe5W5fXhWTlO/+iKK6448dZbbz14cHBwbtK9JPvv1akdc0GCz9ckBbW+VRtv2ruedG6X4PRXvvGNbxz18MMPr5SOKuDnLYV/G8f/nG0w2P5mpYn8s4pA65Th3LxQ6v2XX375ibHdIwHMwcrr8hjzj9I+5F+lHb+r8+Pa7+VPqyiuvw8626+2y0p52UMPPbRTbuC8MAHytz3yyCN7pXbnG++7777dkpf1Jy+bnXPUlBKdWth9OTUuS374XPK5K1ID8v68KOrbafPyvle96lX3jZh53TioR1frY/vPCBz/EugVaI6S3g+MEyBAgAABAgR6BOpaIdfWw5sncLXbkiVLtkkj64/XG1tzsV2PoTWPc2V8vV10VwGlE2yp5FQQYaWgW31YXaZ7Qe7Kb5cAWn+CJ5tXIf7OO+/cOQWVzRM0qcLo7D322OPB7bbb7rmqXZNplqZm0GBqQy1eMYdV/tayKtA37YGVVVKykX+wpvtAtemXgmoFWDfNNp71+OOPb5b/d263fwqZv8vjn4uXLl1ahc/fJRA3K+0lPZp95dlRiGv7V43FoekOrI1MS61/ewxmfJPUrtu9golps+6xV77ylXd3pl9vAbY2vW06M5yTWrJv++lPf3rkHXfccViOwS3yyPeV8+fP//u0tXdFpm/ynfZ3hqsXaG1rygSXd7jhhhu2T3B562233faZI4888u7sH1VTcL3vA6tfk417is52rP2/+pVuHuSY3jFvW94qtd12+MlPfjI/j/7+3lZbbdWf/GqH5FU733bbbQckb+vmBSVZ+UKOr01yHrtz++23/1Xyukdyw6jarfxtauRem/P5v2QfeS43j+6v6Xu6Wn41j9IE5dv8ped7owQIECBAgAABAgQITFKgCmajddPySNxoCx7vsyqkJPDRNjRftcvafryfjfddFTZqHtWepMdAx5OaId+NsQ/UdpxsN+O3f61zVq7SObJrgoEjP1xf/3fS2V18ggZV23CX7gcrAkE9/xqdoMBo+0DNYqx8fIKzN/l0CbT5WJZX23Ss7dokJ9Nuet111+36gx/8YJeRfYLuu+X7bVeT7so/5vScO1czua8JEBhLYCoXG2PN0+cECBAgQIDA80ygLvartli7Wuu75k6bjokMax3a6dt1SQG/+1l9l5o/3Rp5tY71mTv4pfD86Np9oN3+tVZj7QPt9q9pNqR9YOSxWjXtah1mUldprC5pqr6trdMGgWZcemeS3ZqkZeQ+sCHm12uynhvbNL3bNcd1e/zUear6NTlu6jftcdaXeTTnuM7+UZzN/zWiI0Bg8gJ1oOkIECBAgOssMygAAA32SURBVAABAgQIECAw7QIVOKiFbkiBzGlHskACqxFoj6PxJnOMjafjOwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIExhD4/wvVVxexqpUTAAAAAElFTkSuQmCC"' +
    '                 class="icon"/> ' +
    '        </div>' +
    '        <span>亲 <b>%user</b>,</span></br>' +
    '        <span>我们希望您一切都好，并一直在与学生一起练习一小时的考试课程。 </span></br>' +
    '        <span>' +
    '           视频提交的截止日期即将到来。 请在MYbarre微信小程序中登录您的个人资料，然后上传您的考试提交。 如果您未能在提交日期之前上传视频，则您的个人资料和对教学材料的访问将被锁定。' +
    '        </span></br>' +
    '        <div class="lrview">' +
    '             <div class="l">会员编号 : </div>' +
    '             <div class="r">%membershipId </div>' +
    '        </div> ' +
    '        <div class="lrview">' +
    '             <div class="l">状态 : </div>' +
    '             <div class="r">%status </div>' +
    '         </div> ' +
    '        <div class="lrview">' +
    '             <div class="l">影片提交截止日期 : </div>' +
    '             <div class="r">%deadline </div>' +
    '         </div> ' +
    '        </br>' +
    '        <span>如果您有任何疑问，请通过以下方式与我们联系 <b>info@mybarrefitness.com</b></span>' +
    '        </br>' +
    '        <span>亲切的问候,</span>' +
    '        <span>Ann & Siri</span>' +
    '        <span>MYBarre Founders</span>' +
    '' +
    '        <div class="disclaimerCont">' +
    '            ' +
    '            <span class="copyright">© 2020 MYBarre Fitness .</span>' +
    '            </br></br>' +
    '            该电子邮件及其随附的任何文件均为机密信息，仅用于与之联系的个人或实体。 如果您收到此电子邮件错误，请通知系统管理员。 此消息包含机密信息，仅适用于指定的个人。 如果您不是指定的收件人，则不应传播，分发或复制此电子邮件。 如果您错误地收到了此电子邮件，请立即通过电子邮件通知发件人，并从系统中删除该电子邮件。 如果您不是预期的收件人，则将通知您严格禁止根据此信息的内容进行披露，复制，分发或采取任何措施' +
    '            </br></br>' +
    '            本电子邮件中提出的任何观点或观点仅是作者的观点或观点，不一定代表组织的观点或观点。 明确要求<COMPANY>的员工不要发表诽谤性声明，也不得通过电子邮件通信侵犯或授权任何侵犯版权或任何其他合法权利的行为。 任何此类通信均违反组织政策，并超出有关个人的雇用范围。 本组织将不承担与此类交流有关的任何责任，责任员工将对由此引起的任何损失或其他责任承担个人责任。' +
    '            </br></br>' +
    '            我们组织对本电子邮件的内容或基于所提供信息而采取的任何措施的后果不承担任何责任，除非随后以书面形式确认了该信息。 如果您不是预期的收件人，则将通知您严格禁止根据此信息的内容进行披露，复制，分发或采取任何措施。' +
    '        </div>' +
    '     </div>' +
    ' </body>    ' +
    '</html>';

var adminHtml = '<html>' +
    '' +
    '    <style>' +
    '        ' +
    '        *{' +
    '' +
    '        }' +
    '        ' +
    '        img{' +
    '            width : 70px;' +
    '        }' +
    '        ' +
    '        .main{' +
    '            display: flex;' +
    '            flex-direction: column;' +
    '            padding: 10px;' +
    '            height: 100vh;' +
    '        }' +
    '        ' +
    '        label{' +
    '            font-family: \'Verdana\';' +
    '            width : 100% ; ' +
    '            float : left ;' +
    '            text-align: left;' +
    '        }' +
    '        ' +
    '        .b{' +
    '            color: #0F253B;' +
    '        }' +
    '        ' +
    '        .copyright{' +
    '            margin-top: 20px;' +
    '  			font-size: 16px;' +
    '  			font-weight: 600;' +
    '  			' +
    '  			font-family: monospace;' +
    '        }' +
    '        ' +
    '        .vertical_space {' +
    '            margin-top : 20px ; ' +
    '        }' +
    '        ' +
    '        .line{' +
    '            width: 100%;' +
    '            height: 1px;' +
    '            background: gray;' +
    '            margin-top: 20px;' +
    '            margin-bottom: 20px;' +
    '        }' +
    '        ' +
    '' +
    '    </style>' +
    '    ' +
    '    ' +
    '    ' +
    '    <body style="margin: 0px !important ;background:white">' +
    '        <div class="main">' +
    '        ' +
    '            <label class="vertical_space">' +
    '                You have been made administrator for <b>MYBarre</b>. Please refer to credentials below to login to the administrator dashboard.' +
    '            </label>' +
    '            <label class="vertical_space">' +
    '                Please refer to credentials below to login' +
    '            </label>' +
    '            <label class="vertical_space">' +
    '                Email : <br><b>%email</b>' +
    '            </label>' +
    '            <label class="vertical_space">' +
    '                Password : <br><b>%pwd</b>' +
    '            </label>' +
    '            <label class="vertical_space">' +
    '                Dashboard URL : <br><b>%url</b>' +
    '            </label>' +
    '            <label class="vertical_space">' +
    '                Please keep these credentials safe and DO NOT share with anyone else. In case of any issues, please contact us at: <b>inf@mybarrefitness.com</b>' +
    '            </label>' +
    '            <label class="copyright">' +
    '                © 2020 MYBarre Fitness. All rights reserved.' +
    '            </label>' +
    '            ' +
    '        </div>' +
    '    ' +
    '    ' +
    '    </body>' +
    '    ' +
    '    ' +
    '    ' +
    '    ' +
    '    ' +
    '    ' +
    '' +
    '' +
    '</html>';



var userStatusEn = '<html>' +
    '<style>' +
    '    @font-face {' +
    '        font-family: Avenir;' +
    '        src: url(\'https://api.mybarrefitness.com/app/font\') format(\'truetype\');' +
    '    }' +
    '    ' +
    '    * {' +
    '        font-family: \'Avenir\';' +
    '    }' +
    '    ' +
    '    .container {' +
    '        width: calc(100vw - 40px);' +
    '        margin: 10px;' +
    '        padding: 10px;' +
    '        background: white;' +
    '        font-size: 14px;' +
    '        color: black;' +
    '        display: flex;' +
    '        flex-direction: column;' +
    '        background: linear-gradient( #d9bdbbe3, #d9bdbbe3, #d9bdbb9d, #f3d6d48e, #f3d6d46c, #f3d6d42c);' +
    '        border-radius: 8px;' +
    '        box-shadow: 0px 0px 8px 0px #a6a6a6;' +
    '    }' +
    '    ' +
    '    .lrview .l {' +
    '        font-size: 12px;' +
    '        color: black;' +
    '        font-weight: 600;' +
    '        line-height: 20px;' +
    '        text-transform: uppercase;' +
    '    }' +
    '    ' +
    '    .lrview .r {' +
    '        font-size: 14px;' +
    '        color: black;' +
    '        margin-left: 10px;' +
    '        line-height: 20px;' +
    '    }' +
    '    ' +
    '    span {' +
    '        margin-bottom: 4px;' +
    '    }' +
    '    ' +
    '    .imgCont {' +
    '        width: 100%;' +
    '        height: 60px;' +
    '        display: flex;' +
    '        justify-content: center;' +
    '        align-items: center;' +
    '        border-bottom: 0.5px solid white;' +
    '        padding-bottom: 10px;' +
    '        margin-bottom: 20px;' +
    '    }' +
    '    ' +
    '    .imgCont .icon {' +
    '        width: 200px;' +
    '    }' +
    '    ' +
    '    .disclaimerCont {' +
    '        border-top: 0.5px solid #d9bdbbe3;' +
    '        margin-top: 20px;' +
    '        color: gray;' +
    '        font-size: 8px;' +
    '        text-align: left;' +
    '        padding-top: 20px;' +
    '    }' +
    '    ' +
    '    .copyright {' +
    '        font-size: 10px;' +
    '        color: gray;' +
    '    }' +
    '</style>' +
    '' +
    '' +
    '<body>' +
    '' +
    '    <div class="container">' +
    '        <span>Dear Member</span></br>' +
    '        <span>%msg</span>' +
    '        </br>' +
    '        </br>' +
    '        <span>If you have any questions please reach out to us at <b>info@mybarrefitness.com</b></span>' +
    '        </br>' +
    '        <span>Kind regards,</span>' +
    '        </br>' +
    '        </br>' +
    '        <span>Ann & Siri</span>' +
    '        </br>' +
    '        <span>MYBarre Founders</span>' +
    '' +
    '        <div class="disclaimerCont">' +
    '' +
    '            <span class="copyright">© 2020 MYBarre Fitness . All rights reserved.</span>' +
    '            </br>' +
    '            </br>' +
    '            This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager. This message contains confidential' +
    '            information and is intended only for the individual named. If you are not the named addressee, you should not disseminate, distribute or copy this email. Please notify the sender immediately by email if you have received this email by mistake' +
    '            and delete this email from your system. If you are not the intended recipient, you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited' +
    '            </br>' +
    '            </br>' +
    '            Any views or opinions presented in this email are solely those of the author and do not necessarily represent those of the organization. Employees of' +
    '            <COMPANY> are expressly required not to make defamatory statements and not to infringe or authorise any infringement of copyright or any other legal right by email communications. Any such communication is contrary to organizational policy and outside' +
    '                the scope of the employment of the individual concerned. The organization will not accept any liability in respect of such communication, and the employee responsible will be personally liable for any damages or other liability arising' +
    '                </br>' +
    '                </br>' +
    '                Our organization accepts no liability for the content of this email, or for the consequences of any actions taken on the basis of the information provided, unless that information is subsequently confirmed in writing. If you are not the intended recipient,' +
    '                you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.' +
    '        </div>' +
    '' +
    '    </div>' +
    '</body>';



var userStatusZH = '<html>' +
    '<style>' +
    '    @font-face {' +
    '        font-family: Avenir;' +
    '        src: url(https://api.mybarrefitness.com/app/font) format(truetype);' +
    '    }' +
    '    ' +
    '    * {' +
    '        font-family: Avenir;' +
    '    }' +
    '    ' +
    '    .container {' +
    '        width: calc(100vw - 40px);' +
    '        margin: 10px;' +
    '        padding: 10px;' +
    '        background: white;' +
    '        font-size: 14px;' +
    '        color: black;' +
    '        display: flex;' +
    '        flex-direction: column;' +
    '        background: linear-gradient( #d9bdbbe3, #d9bdbbe3, #d9bdbb9d, #f3d6d48e, #f3d6d46c, #f3d6d42c);' +
    '        border-radius: 8px;' +
    '        box-shadow: 0px 0px 8px 0px #a6a6a6;' +
    '    }' +
    '    ' +
    '    .lrview .l {' +
    '        font-size: 12px;' +
    '        color: black;' +
    '        font-weight: 600;' +
    '        line-height: 20px;' +
    '        text-transform: uppercase;' +
    '    }' +
    '    ' +
    '    .lrview .r {' +
    '        font-size: 14px;' +
    '        color: black;' +
    '        margin-left: 10px;' +
    '        line-height: 20px;' +
    '    }' +
    '    ' +
    '    span {' +
    '        margin-bottom: 4px;' +
    '    }' +
    '    ' +
    '    .imgCont {' +
    '        width: 100%;' +
    '        height: 60px;' +
    '        display: flex;' +
    '        justify-content: center;' +
    '        align-items: center;' +
    '        border-bottom: 0.5px solid white;' +
    '        padding-bottom: 10px;' +
    '        margin-bottom: 20px;' +
    '    }' +
    '    ' +
    '    .imgCont .icon {' +
    '        width: 200px;' +
    '    }' +
    '    ' +
    '    .disclaimerCont {' +
    '        border-top: 0.5px solid #d9bdbbe3;' +
    '        margin-top: 20px;' +
    '        color: gray;' +
    '        font-size: 8px;' +
    '        text-align: left;' +
    '        padding-top: 20px;' +
    '    }' +
    '    ' +
    '    .copyright {' +
    '        font-size: 10px;' +
    '        color: gray;' +
    '    }' +
    '</style>' +
    '' +
    '' +
    '<body>' +
    '' +
    '    <div class="container">' +
    '        <span>Dear Member</span></br>' +
    '        <span>%msg</span>' +
    '        </br>' +
    '        </br>' +
    '        <span>>如果您有任何疑问，请通过以下方式与我们联系 <b>info@mybarrefitness.com</b></span>' +
    '        </br>' +
    '        <span>亲切的问候,</span>' +
    '        </br>' +
    '        </br>' +
    '        <span>Ann & Siri</span>' +
    '        </br>' +
    '        <span>MYBarre Founders</span>' +
    '' +
    '        <div class="disclaimerCont">' +
    '' +
    '            <span class="copyright">© 2020 MYBarre Fitness .</span>' +
    '            </br>' +
    '            </br>' +
    '            该电子邮件及其随附的任何文件均为机密信息，仅用于与之联系的个人或实体。 如果您收到此电子邮件错误，请通知系统管理员。 此消息包含机密信息，仅适用于指定的个人。 如果您不是指定的收件人，则不应传播，分发或复制此电子邮件。 如果您错误地收到了此电子邮件，请立即通过电子邮件通知发件人，并从系统中删除该电子邮件。 如果您不是预期的收件人，则将通知您严格禁止根据此信息的内容进行披露，复制，分发或采取任何措施' +
    '            </br>' +
    '            </br>' +
    '            本电子邮件中提出的任何观点或观点仅是作者的观点或观点，不一定代表组织的观点或观点。 明确要求的员工不要发表诽谤性声明，也不得通过电子邮件通信侵犯或授权任何侵犯版权或任何其他合法权利的行为。 任何此类通信均违反组织政策，并超出有关个人的雇用范围。 本组织将不承担与此类交流有关的任何责任，责任员工将对由此引起的任何损失或其他责任承担个人责任。' +
    '            </br>' +
    '            </br>' +
    '            我们组织对本电子邮件的内容或基于所提供信息而采取的任何措施的后果不承担任何责任，除非随后以书面形式确认了该信息。 如果您不是预期的收件人，则将通知您严格禁止根据此信息的内容进行披露，复制，分发或采取任何措施。' +
    '        </div>' +
    '' +
    '    </div>' +
    '</body>' +
    '' +
    '' +
    '</html>';



let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
        user: "apikey",
        pass: "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"
    }
});

async function sendVideoSubmissionEmail(membership) {
    console.log("Sending email in email controller");
    new Promise(async function(resolve, reject) {
        var body;
        var subject;
        console.log(membership);
        const user = membership.user;
        const prefferedLang = user.preffered_language || 'en';
        console.log("prefferedLang = ", prefferedLang);
        if (prefferedLang === 'en') {
            body = en;
            subject = "MYbarre Instructor Exam Video Submission";
        } else {
            body = cn;
            subject = "MYbarre教练考试视频提交";
        }
        body = body.replace("%user", user.first_name);
        body = body.replace("%deadline", membership.video_submission_date);
        body = body.replace("%membershipId", membership.id);
        body = body.replace("%status", membership.status);
        var to = user.email;
        console.log("Emails = ,", to);
        let info = await transporter.sendMail({
            from: '"MYBarre " <info@mybarrefitness.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: body // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        resolve()
    });
};

async function sendAdminCreationEmail(admin) {
    var body = adminHtml;
    body = body.replaceAll("%email", admin.email);
    body = body.replaceAll("%pwd", admin.password);
    body = body.replaceAll("%url", process.env.admin_url);
    let info = transporter.sendMail({
        from: '"MYBarre" <info@mybarre.com>',
        to: admin.email,
        subject: "Your MYBarre admin credentials",
        html: body
    });
    const msgId = info.messageId || -1;
    new Promise(function(resolve, reject) {
        if (msgId === -1) {
            console.log();
            console.log("NODE MAILER ERROR");
            console.log(info);
            console.log();
            reject(info);
        } else {
            resolve();
        }
    });
};


async function sendUserStatusUpdateEmail(user, status, reason) {

    var prefferedLang = 'en'
    try {
        prefferedLang = user.preffered_language
    } catch (error) {
        prefferedLang = 'en'
    }

    var body;
    var msg;
    var subject;
    if (prefferedLang == 'en') {
        body = userStatusEn;
        subject = "Your MYBarre account has been Updated";
        if (status == 'pending') {
            msg = "Your account is under audit. Our team is reviewing the information you provided. We will notify you once your account audit is complete";
        } else if (status == 'approved') {
            msg = "Your MYbarre acount has been approved and restored. You can now simple open the MYbarre Wechat MiniProgram and start using the app";
        } else if (status == 'rejected') {
            msg = "You have reviewed your information and we regret to inform you that your account application has been rejected. Reject reason : " + reason;
        }

    } else {
        body = userStatusZH;
        subject = "你的MYBarre帐户已更新";
        if (status == 'pending') {
            msg = "你的帐户正在审核中。我们的团队正在审核您提供的信息。我们会在您的帐户审核完成后通知您";
        } else if (status == 'approved') {
            msg = "你的MYbarre账号已经被批准恢复。你现在可以简单地打开MYbarre微信程序并开始使用该应用程序";
        } else if (status == 'rejected') {
            msg = "您已经审阅了您的信息，我们很遗憾地通知您，您的帐户申请已被拒绝。拒绝原因：" + reason;
        }
    }




    body = body.replaceAll("%msg", msg);

    let info = transporter.sendMail({
        from: '"MYBarre" <info@mybarre.com>',
        to: user.email,
        subject: "Your MYBarre account has been Updated",
        html: body
    });
    const msgId = info.messageId || -1;
    new Promise(function(resolve, reject) {
        if (msgId === -1) {
            console.log();
            console.log("NODE MAILER ERROR");
            console.log(info);
            console.log();
            reject(info);
        } else {
            resolve();
        }
    });
};

module.exports.sendAdminCreationEmail = sendAdminCreationEmail;
module.exports.sendVideoSubmissionEmail = sendVideoSubmissionEmail;
module.exports.sendUserStatusUpdateEmail = sendUserStatusUpdateEmail;