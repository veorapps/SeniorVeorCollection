import type { NewsletterSubscriptionData } from "@/domain/models";

export interface NewsletterService {
  subscribe(data: NewsletterSubscriptionData): Promise<{ message: string; success: boolean }>;
}

class MockNewsletterService implements NewsletterService {
  async subscribe(data: NewsletterSubscriptionData) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (!data.email.includes("@")) return { success: false, message: "Lütfen geçerli bir e-posta adresi girin." };
    return { success: true, message: "Aboneliğiniz alındı. Teşekkür ederiz." };
  }
}

export const newsletterService = new MockNewsletterService();
