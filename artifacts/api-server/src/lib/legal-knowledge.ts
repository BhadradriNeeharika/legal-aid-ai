export type LegalCategory =
  | "Domestic Violence"
  | "Sexual Harassment (POSH)"
  | "Dowry Harassment"
  | "Women's Safety Laws"
  | "General Legal"
  | null;

interface LegalKnowledgeEntry {
  keywords: string[];
  category: LegalCategory;
  response: string;
}

const legalKnowledge: LegalKnowledgeEntry[] = [
  {
    keywords: ["domestic violence", "husband beats", "beating", "abuse at home", "wife beating", "physical abuse", "abused by husband", "abused by partner", "violence at home"],
    category: "Domestic Violence",
    response: `Under the Protection of Women from Domestic Violence Act, 2005 (PWDVA), you are protected from physical, emotional, sexual, verbal, and economic abuse by anyone in a domestic relationship with you.

Your rights under this Act:
1. Right to reside in your shared household, even if you don't own it
2. Right to file a Domestic Incident Report (DIR) with a Protection Officer
3. Right to get a Protection Order from a magistrate to stop the abuser
4. Right to claim monetary relief and custody of children

Immediate steps you can take:
- Call the Women Helpline: 181 (free, 24/7)
- Call National Emergency: 112
- Visit your nearest police station and file an FIR
- Contact a Protection Officer at your District Legal Services Authority (DLSA)

You can file a complaint directly at the police station or through a local NGO or Protection Officer. Legal aid is available free of cost under the Legal Services Authorities Act.`,
  },
  {
    keywords: ["sexual harassment", "workplace harassment", "posh", "molested at office", "boss harassing", "colleague harassment", "inappropriate touching", "sexual comments", "sexual advances"],
    category: "Sexual Harassment (POSH)",
    response: `The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) protects you from sexual harassment at any workplace.

Sexual harassment includes: unwelcome physical contact, sexual favors demands, sexually colored remarks, showing pornography, or any other unwelcome conduct of sexual nature.

Your rights under POSH:
1. Every employer with 10+ employees must have an Internal Complaints Committee (ICC)
2. You can file a written complaint with your ICC within 3 months of the incident
3. Your identity will be kept confidential
4. You are protected from retaliation or victimization
5. You can request conciliation or inquiry proceedings

Immediate steps:
- Document all incidents with dates, times, witnesses
- Report to your company's ICC or HR department
- If the employer has fewer than 10 employees, approach the Local Complaints Committee (LCC) at the district level
- Call 181 Women Helpline for guidance

The employer is legally bound to complete inquiry within 90 days and take action within 60 days of recommendations.`,
  },
  {
    keywords: ["dowry", "dowry harassment", "in laws demanding money", "in laws demanding gifts", "dowry demand", "dowry death", "section 498a", "498-a", "cruelty by husband"],
    category: "Dowry Harassment",
    response: `Dowry is illegal in India under the Dowry Prohibition Act, 1961. Demanding or giving dowry is a criminal offense punishable with imprisonment up to 5 years and a fine.

Laws that protect you:
1. Dowry Prohibition Act, 1961 — makes demanding, giving, or taking dowry a crime
2. Section 498A IPC (now BNS) — cruelty by husband/relatives for dowry is punishable with up to 3 years imprisonment
3. Section 304B IPC — dowry death within 7 years of marriage is cognizable and non-bailable

Your rights:
- You can file an FIR at any police station under Section 498A
- Women's Protection Cell in every state police handles these complaints
- You are entitled to legal aid and protection
- Your Stridhan (gifts received before/during marriage) belongs solely to you

Immediate steps:
- Call Women Helpline: 181
- File an FIR at the nearest police station
- Contact a women's rights NGO for legal support
- Your complaint is cognizable — police must register it

You do not need to tolerate harassment. The law is strongly on your side.`,
  },
  {
    keywords: ["rape", "sexual assault", "molested", "eve teasing", "stalking", "stalker", "groping", "sexual violence"],
    category: "Women's Safety Laws",
    response: `You are protected by several strong laws in India:

Laws protecting you:
1. Section 376 IPC (now BNS) — Rape is punishable with minimum 7 years to life imprisonment
2. Section 354 IPC — Assault on a woman with intent to outrage modesty: up to 5 years
3. Section 354A — Sexual harassment, including unwelcome physical contact: up to 3 years
4. Section 354D — Stalking: up to 5 years for repeat offense
5. Protection of Children from Sexual Offences (POCSO) Act — for minors

Your rights:
- You can file an FIR at any police station regardless of where the crime occurred
- Police CANNOT refuse to register an FIR — if they do, contact SP or DGP
- Your statement can be recorded by a female officer
- Medical examination must be done by a female doctor
- Your name will NOT be published in media (Section 228A IPC)
- Free legal aid is your right

Immediate steps:
- Call Emergency: 112 or 100 (Police)
- Call Women Helpline: 181
- Go to the nearest hospital for medical care and evidence collection
- File an FIR — you have the right to do so

You are not alone. Help is available 24/7.`,
  },
  {
    keywords: ["property rights", "property after divorce", "inheritance", "property inheritance woman", "land rights", "property ownership"],
    category: "Women's Safety Laws",
    response: `Indian women have strong property rights under multiple laws:

Key laws:
1. Hindu Succession Act, 1956 (amended 2005) — daughters have equal right to ancestral property as sons
2. Hindu Succession Amendment Act, 2005 — daughters are coparceners in joint family property
3. Muslim Women (Protection of Rights on Divorce) Act, 1986
4. Indian Succession Act — for Christians and Parsis

Your property rights:
- You have equal right in your parents' ancestral property (Hindu law)
- You can inherit property from both parents
- Your Stridhan (dowry received, gifts) belongs solely to you
- After divorce, you may be entitled to a share of matrimonial property
- You have the right to maintenance under Section 125 CrPC

After divorce:
- You can claim maintenance (alimony)
- You may claim share in husband's property in some circumstances
- Children's custody can be decided based on their best interests

Contact a family court lawyer or District Legal Services Authority for free legal aid.`,
  },
  {
    keywords: ["divorce", "separation", "marriage", "matrimonial", "alimony", "maintenance", "child custody"],
    category: "Women's Safety Laws",
    response: `You have the right to seek divorce and claim your legal entitlements. Here is what you need to know:

Grounds for divorce (Hindu Marriage Act):
- Cruelty (physical or mental)
- Adultery
- Desertion for 2+ years
- Conversion to another religion
- Mental illness
- Communicable disease
- Renunciation of the world
- Presumed death for 7 years

Your rights during divorce:
1. Maintenance/Alimony — you can claim maintenance under Section 125 CrPC while proceedings are on
2. Permanent alimony — court can order the husband to pay for your lifetime support
3. Child custody — courts prioritize the child's best interests; mothers often get custody for young children
4. Residence — you have the right to reside in the matrimonial home during proceedings
5. Share in property — you may be entitled to a share of household property

Steps to take:
- Consult a family lawyer (free legal aid available at DLSA)
- File for divorce in the Family Court in your area
- You can file simultaneously for maintenance under Section 125 CrPC

Remember: Legal aid is free. Contact your District Legal Services Authority (DLSA) today.`,
  },
  {
    keywords: ["maternity", "maternity leave", "pregnancy rights", "pregnant at work", "fired during pregnancy", "dismissed pregnant"],
    category: "General Legal",
    response: `The Maternity Benefit Act, 2017 strongly protects pregnant working women in India.

Your maternity rights:
1. 26 weeks of paid maternity leave for first two children (12 weeks for third child onwards)
2. 12 weeks leave for adopting mothers and commissioning mothers (surrogacy)
3. Employers with 50+ employees must provide crèche facility
4. Work from home option after maternity leave (where nature of work allows)
5. Nursing breaks during work hours

Protection against dismissal:
- It is ILLEGAL to fire or demote you during pregnancy or maternity leave
- Any such dismissal is void and unenforceable
- You can file a complaint with the Labour Commissioner
- Criminal complaint can be filed against the employer

Applies to: All establishments (factories, shops, offices) with 10+ employees in last 12 months.

If your employer violates your maternity rights:
- File a complaint with the local Labour Office
- Contact Women Helpline: 181
- Seek legal aid from DLSA`,
  },
];

export function detectCategoryAndResponse(message: string): {
  category: LegalCategory;
  response: string | null;
} {
  const lowerMessage = message.toLowerCase();

  for (const entry of legalKnowledge) {
    for (const keyword of entry.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return {
          category: entry.category,
          response: entry.response,
        };
      }
    }
  }

  return { category: null, response: null };
}

export function getCategoryFromKeywords(message: string): LegalCategory {
  const { category } = detectCategoryAndResponse(message);
  return category;
}

export function generateFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("help") ||
    lower.includes("emergency") ||
    lower.includes("danger") ||
    lower.includes("safe") ||
    lower.includes("scared")
  ) {
    return `If you are in immediate danger, please call:
- Emergency: 112 (Police)
- Women Helpline: 181 (Free, 24/7)
- Domestic Violence Helpline: 181

You are not alone. Help is available immediately.

Please tell me more about your specific situation and I can help you understand your legal rights and the resources available to you.`;
  }

  if (lower.includes("legal aid") || lower.includes("lawyer") || lower.includes("advocate")) {
    return `Free legal aid is available to all women and marginalized communities in India under the Legal Services Authorities Act, 1987.

How to get free legal aid:
1. Contact your District Legal Services Authority (DLSA) — available in every district
2. Visit the nearest Lok Adalat for dispute resolution
3. Contact State Legal Services Authority (SLSA)
4. Call 15100 — National Legal Services Authority helpline

Eligibility: Women, members of SC/ST communities, persons with disabilities, children, persons in custody, and those with income below the threshold are entitled to free legal aid.

Services provided: Legal advice, representation in court, preparation of legal documents, and assistance in legal proceedings.

What is your specific legal concern? I can provide more targeted guidance.`;
  }

  return `Thank you for reaching out to the Legal Aid Assistant. I'm here to help you understand your legal rights.

I can help you with questions about:
- Domestic violence and protection orders
- Sexual harassment at the workplace (POSH Act)
- Dowry harassment and Section 498A
- Women's safety laws (rape, assault, stalking)
- Property rights and inheritance
- Divorce, maintenance, and child custody
- Maternity rights at the workplace

Please describe your situation in more detail and I will provide you with information about the laws that protect you and the steps you can take.

Remember: Free legal aid is available to all women in India. You are not alone.`;
}
