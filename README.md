# 💸 Full Stack AI Finance Platform  

## 📸 Screenshots  

### Landing Page  
<img width="1053" height="826" alt="Landing Page" src="https://github.com/user-attachments/assets/a232da5f-ea9e-4e6f-95cc-95590a3f6d11" />  

<img width="1011" height="818" alt="image" src="https://github.com/user-attachments/assets/6323e656-e6bd-4e8f-8ec4-ca4c21d4a4e9" />


### Dashboard  
<img width="1020" height="564" alt="Dashboard" src="https://github.com/user-attachments/assets/e40832f3-df29-4e7a-96ce-c7b4ee1fe470" />  

### AI Receipt Scanner  
<img width="999" height="582" alt="AI Receipt Scanner" src="https://github.com/user-attachments/assets/dc7279f6-e8e8-4fe0-bdf6-b3c07c3b8807" />  

### Profile Page
<img width="640" height="538" alt="image" src="https://github.com/user-attachments/assets/5cc0eb6b-d515-45cc-a240-5f2ec9476ad0" />

---

Built with cutting-edge technologies to deliver a secure, scalable, and modern finance management solution.  

## 🚀 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/)  
- **Database & ORM:** [Supabase](https://supabase.com/) + [Prisma](https://www.prisma.io/)  
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)  
- **Auth:** [Clerk](https://clerk.com/)  
- **Background Jobs:** [Inngest](https://www.inngest.com/)  
- **Security:** [ArcJet](https://arcjet.com/)  
- **AI:** **Groq API**  
- **Email Service:** [Resend](https://resend.com/)  

---

## ⚙️ Environment Setup  

Create a `.env` file in the root directory and add the following variables:  

```env
# Database
DATABASE_URL=
DIRECT_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# APIs
GROQ_API_KEY=
RESEND_API_KEY=
ARCJET_KEY=
