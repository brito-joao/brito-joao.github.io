export interface Section {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface TechSkill {
  name: string;
  category: "Engineering" | "Digital" | "Discipline";
  level: number; // 0-100
  detail: string;
}

export interface ChurchTimelineEvent {
  year: string;
  title: string;
  description: string;
  location: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  metrics?: string;
}

export const SECTIONS: Section[] = [
  { id: "hero", num: "01", title: "João Brito", subtitle: "Arquitetura de sistemas & experiência digital", badge: "O Gancho" },
  { id: "builder", num: "02", title: "O Construtor", subtitle: "Engenharia & excelência corporativa", badge: "Precisão" },
  { id: "foundation", num: "03", title: "A Fundação", subtitle: "Fé, evangelismo de rua & comunidade", badge: "Propósito" },
  { id: "discipline", num: "04", title: "A Disciplina", subtitle: "Crisol físico & integridade", badge: "Garra" },
  { id: "invitation", num: "05", title: "O Convite", subtitle: "Alinhando visões e propósitos", badge: "Conetar" },
];

export const TECH_SKILLS: TechSkill[] = [
  { name: "Engenharia Eletrotécnica", category: "Engineering", level: 90, detail: "Circuitos físicos, distribuição de energia & engenharia de sistemas." },
  { name: "Arquitetura Digital", category: "Digital", level: 95, detail: "Frontends interativos topo de gama, React, TypeScript e integrações robustas." },
  { name: "Estratégia Analítica", category: "Engineering", level: 85, detail: "Metodologia profissional Deloitte, consultoria e auditoria tecnológica." },
  { name: "Oratória & Ensino de Línguas", category: "Discipline", level: 92, detail: "Pregação urbana, ensino prático de português & liderança de grupo." },
  { name: "Resistência & Foco", category: "Discipline", level: 98, detail: "Alta disciplina física, supino de 140kg & blindagem mental." },
];

export const PROJECTS: Project[] = [
  {
    title: "Orquestração Corporativa na Deloitte",
    category: "Consultoria de TI",
    description: "Apoio a auditorias de sistemas corporativos de grande dimensão, análise estrutural de bases de dados e validação de compliance de software para multinacionais.",
    tech: ["Auditoria", "Arquitetura", "Metodologia Deloitte"],
    metrics: "2 Anos de Carreira"
  },
  {
    title: "Missão e Evangelismo Urbano",
    category: "Comunidade & Fé",
    description: "Liderança de equipas de rua em Lisboa, dinamizando debates apologéticos abertos e partilhando voluntariamente a verdade bíblica em centros urbanos.",
    tech: ["Aconselhamento", "Liderança", "Oratória"],
    metrics: "Lisboa, Portugal"
  },
  {
    title: "Plataforma de Simulação Eletrotécnica",
    category: "Engenharia",
    description: "Conceção e desenvolvimento de protótipo de software educativo focado no comportamento dinâmico de circuitos RLC e impedâncias virtuais.",
    tech: ["RLC", "Harmónicos", "Processamento de Sinal"],
    metrics: "98% de Eficiência"
  }
];

export const CHURCH_TIMELINE: ChurchTimelineEvent[] = [
  {
    year: "Contínuo",
    title: "Pregação de Rua no Coração de Lisboa",
    description: "Partilha transparente do Evangelho, promovendo diálogo filosófico honesto sobre moralidade e fé em praças como o Rossio e Chiado.",
    location: "Baixa-Chiado, Lisboa"
  },
  {
    year: "Semanal",
    title: "Mentoria de Jovens & Integração",
    description: "Liderança de dinâmicas e estudos bíblicos, ajudando estudantes universitários a integrar a sua fé com as exigências académicas.",
    location: "Lisboa, Portugal"
  },
  {
    year: "Académico",
    title: "Apoio ao Ensino de Línguas",
    description: "Apoio voluntário em explicações da língua portuguesa para estrangeiros e nómadas digitais recém-chegados a Lisboa.",
    location: "Lisboa, Portugal"
  }
];
