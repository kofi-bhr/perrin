// This file contains data definitions and the labs data
// We avoid using JSX directly in this data file

import React from 'react';
import { 
  FiActivity, 
  FiTrendingUp, 
  FiGlobe, 
  FiDatabase, 
  FiUsers, 
  FiLayers,
  FiCheck,
  FiCpu,
  FiHeart,
  FiCloud,
  FiMessageCircle,
  FiBox,
  FiFlag,
  FiDollarSign,
  FiBookOpen,
  FiTarget
} from 'react-icons/fi';

// Define interfaces for type safety
export interface LabMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface Publication {
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  link?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Lab {
  id: string;
  title: string;
  iconName: string;
  color: string;
  textColor: string;
  description: string;
  longDescription?: string;
  stats: Stat[];
  image?: string;
  defaultImage?: string;
  members: LabMember[];
  publications: Publication[];
  methodology?: string;
  contactEmail?: string;
}

// Icon mapping for dynamic rendering
export const ICONS_MAP: Record<string, React.ComponentType<any>> = {
  FiActivity,
  FiTrendingUp,
  FiGlobe,
  FiDatabase,
  FiUsers,
  FiLayers,
  FiCheck,
  FiCpu,
  FiHeart,
  FiCloud,
  FiMessageCircle,
  FiBox,
  FiFlag,
  FiDollarSign,
  FiBookOpen,
  FiTarget
};

// Lab data without React elements
export const LABS_DATA: Lab[] = [
  {
    id: "ai-governance",
    title: "AI Governance",
    iconName: "FiCpu",
    color: "bg-indigo-700",
    textColor: "text-white",
    description: "Researching policy frameworks and governance models to ensure artificial intelligence development remains ethical, safe, and beneficial to society.",
    longDescription: "The AI Governance lab investigates the complex challenges presented by rapidly evolving artificial intelligence technologies. Our research aims to develop frameworks, standards, and governance models that promote responsible AI innovation while mitigating risks and ensuring equitable distribution of benefits across society.",
    stats: [],
    image: "/images/ai-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Amara Patel",
        role: "Lab Director",
        image: "/images/team/placeholder.jpg",
        bio: "Specialized in AI ethics and governance with previous experience at major tech companies and regulatory bodies."
      },
      {
        name: "Jonathan Lee",
        role: "Policy Researcher",
        image: "/images/team/placeholder.jpg",
        bio: "Focuses on the intersection of technical AI safety and policy implementation."
      },
      {
        name: "Dr. Maria Santos",
        role: "Ethics Specialist",
        image: "/images/team/placeholder.jpg",
        bio: "Philosophy background with expertise in applied ethics for emerging technologies."
      }
    ],
    publications: [
      {
        title: "Adaptive Governance for Generative AI Systems",
        authors: ["Amara Patel", "Jonathan Lee", "Wei Zhang"],
        date: "January 2024",
        abstract: "A framework for developing governance systems that can evolve alongside rapid advancements in generative AI technologies.",
        link: "#"
      },
      {
        title: "Auditing Algorithms: Transparency Mechanisms for High-Risk AI Systems",
        authors: ["Maria Santos", "Amara Patel"],
        date: "November 2023",
        abstract: "An examination of methodologies for increasing transparency and accountability in algorithmic systems deployed in sensitive domains.",
        link: "#"
      }
    ],
    methodology: "Our lab combines technical expertise with policy analysis to bridge the gap between AI capabilities and governance frameworks. We employ interdisciplinary approaches including stakeholder analysis, risk assessment, scenario planning, and technical auditing to develop comprehensive governance solutions for AI systems.",
    contactEmail: "ai.governance@example.org"
  },
  {
    id: "inclusive-policy",
    title: "Inclusive Policy",
    iconName: "FiHeart",
    color: "bg-pink-700",
    textColor: "text-white",
    description: "Designing and evaluating policies that promote equity, inclusion, and representation across diverse communities and demographics.",
    longDescription: "The Inclusive Policy lab focuses on developing approaches to policy design that center equity and inclusion from the outset. Our research examines how policies impact different communities and seeks to eliminate disparities through evidence-based interventions and innovative policy frameworks.",
    stats: [],
    image: "/images/inclusive-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Keisha Williams",
        role: "Research Director",
        image: "/images/team/placeholder.jpg",
        bio: "Specializes in intersectional approaches to policy development with focus on underrepresented communities."
      },
      {
        name: "Raj Mehta",
        role: "Policy Analyst",
        image: "/images/team/placeholder.jpg",
        bio: "Expert in measuring policy outcomes across different demographic groups and developing equity metrics."
      },
      {
        name: "Sofia Reyes",
        role: "Community Engagement Lead",
        image: "/images/team/placeholder.jpg",
        bio: "Develops participatory research methods to ensure diverse perspectives in policy formation."
      }
    ],
    publications: [
      {
        title: "Beyond Representation: Structural Inclusion in Policy Design",
        authors: ["Keisha Williams", "Sofia Reyes"],
        date: "March 2024",
        abstract: "An analysis of how policy design processes can move beyond tokenistic representation to meaningful structural inclusion of diverse perspectives.",
        link: "#"
      },
      {
        title: "Measuring Equity Impact: New Frameworks for Policy Assessment",
        authors: ["Raj Mehta", "Keisha Williams", "James Porter"],
        date: "October 2023",
        abstract: "A proposed methodology for quantitatively and qualitatively measuring the equity impacts of policies across different populations and contexts.",
        link: "#"
      }
    ],
    methodology: "Our lab employs community-based participatory research methods, intersectional analysis, and equity impact assessments. We believe in 'nothing about us without us' as a core principle, ensuring that those most affected by policies are central to their development and evaluation.",
    contactEmail: "inclusive.policy@example.org"
  },
  {
    id: "climate-technology",
    title: "Climate Technology",
    iconName: "FiCloud",
    color: "bg-green-700",
    textColor: "text-white",
    description: "Researching technological solutions to climate challenges and the policy frameworks needed to accelerate their development and deployment.",
    longDescription: "The Climate Technology lab investigates emerging technologies with the potential to mitigate climate change and support adaptation strategies. Our research focuses on both the technical aspects of climate solutions and the policy environments that can either accelerate or hinder their implementation at scale.",
    stats: [],
    image: "/images/climate-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Nathan Chen",
        role: "Lab Director",
        image: "/images/team/placeholder.jpg",
        bio: "Climate scientist with expertise in technological approaches to carbon removal and renewable energy systems."
      },
      {
        name: "Dr. Isabella Moreno",
        role: "Policy Researcher",
        image: "/images/team/placeholder.jpg",
        bio: "Specializes in regulatory frameworks for emerging climate technologies and international climate agreements."
      },
      {
        name: "Alex Kim",
        role: "Technology Analyst",
        image: "/images/team/placeholder.jpg",
        bio: "Engineers scalable climate solutions with a focus on implementation in developing economies."
      }
    ],
    publications: [
      {
        title: "Accelerating Carbon Removal: Policy Pathways for Negative Emission Technologies",
        authors: ["Nathan Chen", "Isabella Moreno"],
        date: "February 2024",
        abstract: "An examination of policy mechanisms to accelerate the development, testing, and deployment of negative emissions technologies at scale.",
        link: "#"
      },
      {
        title: "Distributed Renewable Energy Systems in Rural Communities",
        authors: ["Alex Kim", "Nathan Chen", "Maya Patel"],
        date: "September 2023",
        abstract: "Case studies of successful distributed renewable energy implementations in rural and remote communities, with policy recommendations for scaling these models.",
        link: "#"
      }
    ],
    methodology: "Our lab combines technical and policy expertise to bridge the gap between climate technology innovation and implementation. We employ systems thinking, scenario analysis, techno-economic assessment, and stakeholder engagement to develop comprehensive approaches to climate technology deployment.",
    contactEmail: "climate.tech@example.org"
  },
  {
    id: "deliberative-democracy",
    title: "Deliberative Democracy",
    iconName: "FiMessageCircle",
    color: "bg-orange-700",
    textColor: "text-white",
    description: "Exploring innovative democratic processes that enhance public deliberation, citizen participation, and collective decision-making on complex policy issues.",
    longDescription: "The Deliberative Democracy lab investigates approaches to democratic governance that emphasize informed discussion, inclusive participation, and collective reasoning. Our research examines how deliberative processes can address polarization, improve policy outcomes, and strengthen democratic institutions.",
    stats: [],
    image: "/images/democracy-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Marcus Johnson",
        role: "Research Director",
        image: "/images/team/placeholder.jpg",
        bio: "Political theorist specializing in deliberative democratic processes and institutional design."
      },
      {
        name: "Dr. Sophia Park",
        role: "Process Designer",
        image: "/images/team/placeholder.jpg",
        bio: "Develops innovative deliberative formats for addressing complex policy challenges."
      },
      {
        name: "Jamal Washington",
        role: "Community Engagement Specialist",
        image: "/images/team/placeholder.jpg",
        bio: "Focuses on inclusive recruitment and facilitation strategies for diverse deliberative forums."
      }
    ],
    publications: [
      {
        title: "Digital Deliberation: Designing Online Spaces for Meaningful Civic Engagement",
        authors: ["Sophia Park", "Marcus Johnson"],
        date: "April 2024",
        abstract: "An analysis of design principles for digital platforms that support substantive deliberation rather than polarized debate.",
        link: "#"
      },
      {
        title: "Citizens' Assemblies on Climate Policy: Comparative Case Studies",
        authors: ["Jamal Washington", "Marcus Johnson", "Lin Wei"],
        date: "December 2023",
        abstract: "Examination of citizens' assemblies on climate policy across different countries, assessing their composition, process design, and policy impact.",
        link: "#"
      }
    ],
    methodology: "Our lab employs mixed methods research combining empirical analysis of deliberative processes with normative democratic theory. We design, implement, and evaluate deliberative forums in partnership with communities and institutions, drawing on facilitation expertise, institutional design, and democratic theory.",
    contactEmail: "deliberative.democracy@example.org"
  },
  {
    id: "special-projects",
    title: "Special Projects Lab",
    iconName: "FiBox",
    color: "bg-red-700",
    textColor: "text-white",
    description: "Conducting interdisciplinary research on emerging issues that require rapid response and innovative methodological approaches.",
    longDescription: "The Special Projects lab serves as an incubator for time-sensitive research on emerging policy challenges. Our flexible team adapts quickly to address urgent issues, experiment with novel methodologies, and generate preliminary insights that can inform more sustained research efforts.",
    stats: [],
    image: "/images/special-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Eliza Cortez",
        role: "Lab Director",
        image: "/images/team/placeholder.jpg",
        bio: "Versatile researcher with background in crisis response policy and rapid methodology development."
      },
      {
        name: "Dr. Kwame Osei",
        role: "Research Methodologist",
        image: "/images/team/placeholder.jpg",
        bio: "Specializes in developing adaptive research designs for complex and time-sensitive research questions."
      },
      {
        name: "Taylor Schmidt",
        role: "Policy Analyst",
        image: "/images/team/placeholder.jpg",
        bio: "Expert in synthesizing diverse evidence sources for rapid policy response in crisis situations."
      }
    ],
    publications: [
      {
        title: "Rapid Response Research: Methodological Framework for Crisis Policy Development",
        authors: ["Eliza Cortez", "Kwame Osei"],
        date: "March 2024",
        abstract: "A proposed framework for maintaining research rigor while significantly accelerating the research-to-policy pipeline during crises.",
        link: "#"
      },
      {
        title: "Emerging Technologies and Social Impacts: Early Warning System",
        authors: ["Taylor Schmidt", "Eliza Cortez", "Jason Lee"],
        date: "November 2023",
        abstract: "Development of an early warning system to identify and assess emerging technologies with significant potential social and policy implications.",
        link: "#"
      }
    ],
    methodology: "Our lab takes a highly adaptive approach, developing bespoke methodologies for each project based on its specific context and constraints. We emphasize rapid iteration, cross-disciplinary collaboration, and pragmatic application while maintaining methodological rigor.",
    contactEmail: "special.projects@example.org"
  },
  {
    id: "foreign-affairs",
    title: "Foreign Affairs Lab",
    iconName: "FiFlag",
    color: "bg-cyan-700",
    textColor: "text-white",
    description: "Analyzing international relations, diplomatic approaches, and foreign policy strategies in an era of shifting global power dynamics.",
    longDescription: "The Foreign Affairs lab examines evolving international relations and foreign policy challenges in a rapidly changing global landscape. Our research focuses on diplomatic innovations, international institutions, and policy frameworks that can address transnational challenges while promoting peace, security, and human development.",
    stats: [],
    image: "/images/foreign-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Alexandra Reid",
        role: "Research Director",
        image: "/images/team/placeholder.jpg",
        bio: "Former diplomat with expertise in multilateral institutions and international security policy."
      },
      {
        name: "Dr. Ibrahim Nasir",
        role: "Regional Specialist",
        image: "/images/team/placeholder.jpg",
        bio: "Expert on South Asian geopolitics and regional cooperation mechanisms."
      },
      {
        name: "Dr. Michel Dubois",
        role: "Diplomatic Innovation Researcher",
        image: "/images/team/placeholder.jpg",
        bio: "Focuses on new approaches to diplomacy in digital contexts and multi-stakeholder settings."
      }
    ],
    publications: [
      {
        title: "Digital Diplomacy in an Age of Disinformation",
        authors: ["Michel Dubois", "Alexandra Reid"],
        date: "February 2024",
        abstract: "An analysis of how diplomatic practices are evolving in response to digital communication platforms and information manipulation.",
        link: "#"
      },
      {
        title: "Regional Integration in South Asia: Opportunities and Obstacles",
        authors: ["Ibrahim Nasir", "Alexandra Reid", "Priya Sharma"],
        date: "October 2023",
        abstract: "A comprehensive assessment of the potential for deeper regional integration in South Asia, examining economic, security, and cultural dimensions.",
        link: "#"
      }
    ],
    methodology: "Our lab combines traditional diplomatic expertise with innovative research methods, including network analysis, scenario planning, and multi-stakeholder dialogues. We engage directly with diplomatic practitioners, international organizations, and civil society to ensure our research addresses practical challenges.",
    contactEmail: "foreign.affairs@example.org"
  },
  {
    id: "economic-policy",
    title: "Economic Policy Lab",
    iconName: "FiDollarSign",
    color: "bg-yellow-700",
    textColor: "text-white",
    description: "Researching innovative economic policies to address inequality, promote sustainable growth, and enhance shared prosperity in a changing global economy.",
    longDescription: "The Economic Policy lab investigates policy approaches to create more equitable, resilient, and sustainable economic systems. Our research examines alternatives to conventional economic models, innovative policy instruments, and targeted interventions to address structural economic challenges.",
    stats: [],
    image: "/images/economic-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Samuel Kim",
        role: "Lab Director",
        image: "/images/team/placeholder.jpg",
        bio: "Economist specializing in inclusive growth strategies and innovative economic policy design."
      },
      {
        name: "Dr. Fatima Abdi",
        role: "Senior Economist",
        image: "/images/team/placeholder.jpg",
        bio: "Expert in economic inequality, labor markets, and distributional impacts of policy interventions."
      },
      {
        name: "Noah Chen",
        role: "Policy Analyst",
        image: "/images/team/placeholder.jpg",
        bio: "Focuses on empirical evaluation of economic policies and their effects on different population segments."
      }
    ],
    publications: [
      {
        title: "Universal Basic Income: Implementation Models and Economic Impacts",
        authors: ["Samuel Kim", "Fatima Abdi"],
        date: "April 2024",
        abstract: "A comparative analysis of different UBI implementation approaches and their projected economic impacts across diverse demographic groups.",
        link: "#"
      },
      {
        title: "Green Industrial Policy: Balancing Environmental and Economic Objectives",
        authors: ["Noah Chen", "Samuel Kim", "Leila Patel"],
        date: "November 2023",
        abstract: "An examination of industrial policy frameworks designed to simultaneously advance environmental sustainability and economic development goals.",
        link: "#"
      }
    ],
    methodology: "Our lab combines quantitative economic modeling with qualitative policy analysis. We employ microsimulation, distributional impact assessment, and case study approaches to develop and evaluate economic policies that promote inclusive prosperity.",
    contactEmail: "economic.policy@example.org"
  },
  {
    id: "legal-research",
    title: "Legal Research Lab",
    iconName: "FiBookOpen",
    color: "bg-gray-700",
    textColor: "text-white",
    description: "Exploring legal frameworks, regulatory approaches, and jurisprudential innovations to address emerging policy challenges and technological changes.",
    longDescription: "The Legal Research lab examines how legal systems can adapt to meet contemporary societal challenges. Our research focuses on regulatory innovation, constitutional design, rights frameworks, and legal institutions that can effectively govern emerging technologies and complex social issues.",
    stats: [],
    image: "/images/legal-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Rebecca Goldman",
        role: "Research Director",
        image: "/images/team/placeholder.jpg",
        bio: "Legal scholar specializing in constitutional law and regulatory frameworks for emerging technologies."
      },
      {
        name: "Dr. Miguel Torres",
        role: "Comparative Law Specialist",
        image: "/images/team/placeholder.jpg",
        bio: "Expert in comparing legal approaches across jurisdictions to identify innovative regulatory solutions."
      },
      {
        name: "Zara Ahmed",
        role: "Technology Law Researcher",
        image: "/images/team/placeholder.jpg",
        bio: "Focuses on legal challenges posed by artificial intelligence, biotechnology, and digital platforms."
      }
    ],
    publications: [
      {
        title: "Regulating Algorithmic Decision-Making: Comparative Analysis of Emerging Frameworks",
        authors: ["Rebecca Goldman", "Zara Ahmed"],
        date: "March 2024",
        abstract: "A comparative study of legal and regulatory approaches to algorithmic decision-making systems across different jurisdictions.",
        link: "#"
      },
      {
        title: "Constitutional Rights in Digital Spaces: Evolving Jurisprudence",
        authors: ["Miguel Torres", "Rebecca Goldman", "Jason Park"],
        date: "December 2023",
        abstract: "An examination of how constitutional rights frameworks are being adapted and reinterpreted to address digital contexts and online interactions.",
        link: "#"
      }
    ],
    methodology: "Our lab employs doctrinal legal analysis, comparative law methodologies, and interdisciplinary approaches that integrate technical and social science perspectives. We engage with legal practitioners, judges, regulators, and civil society to ensure our research addresses practical legal challenges.",
    contactEmail: "legal.research@example.org"
  },
  {
    id: "policy-entrepreneurship",
    title: "Policy Entrepreneurship Lab",
    iconName: "FiTarget",
    color: "bg-purple-700",
    textColor: "text-white",
    description: "Developing strategies and frameworks to identify policy windows, build coalitions, and advance innovative solutions to complex societal challenges.",
    longDescription: "The Policy Entrepreneurship lab investigates how innovative policy ideas move from conception to implementation. Our research examines the strategies, networks, and institutional contexts that enable policy entrepreneurs to successfully navigate complex political landscapes and create meaningful change.",
    stats: [],
    image: "/images/entrepreneur-lab.jpg",
    defaultImage: "/images/default-lab.jpg",
    members: [
      {
        name: "Dr. Victoria Lopez",
        role: "Lab Director",
        image: "/images/team/placeholder.jpg",
        bio: "Political scientist specializing in policy diffusion and the role of entrepreneurs in policy innovation."
      },
      {
        name: "Dr. Robert Ndlovu",
        role: "Coalition Researcher",
        image: "/images/team/placeholder.jpg",
        bio: "Expert in coalition building and multi-stakeholder policy advocacy strategies."
      },
      {
        name: "Jin-Ho Park",
        role: "Implementation Strategist",
        image: "/images/team/placeholder.jpg",
        bio: "Focuses on translating policy ideas into actionable implementation plans across different institutional contexts."
      }
    ],
    publications: [
      {
        title: "From Idea to Implementation: Pathways for Policy Innovation",
        authors: ["Victoria Lopez", "Jin-Ho Park"],
        date: "April 2024",
        abstract: "A framework for understanding the processes and strategies that enable policy innovations to move successfully from concept to implementation.",
        link: "#"
      },
      {
        title: "Building Unusual Coalitions: Case Studies in Successful Policy Change",
        authors: ["Robert Ndlovu", "Victoria Lopez", "Maria Chen"],
        date: "October 2023",
        abstract: "An analysis of successful policy coalitions that bridged ideological and sectoral divides to achieve significant policy reforms.",
        link: "#"
      }
    ],
    methodology: "Our lab combines political science theories with practical implementation strategies. We employ process tracing, network analysis, and case study approaches to identify successful policy entrepreneurship strategies that can be adapted across different contexts.",
    contactEmail: "policy.entrepreneurship@example.org"
  }
];

// Helper function to get lab by ID
export function getLabById(id: string): Lab | undefined {
  return LABS_DATA.find(lab => lab.id === id);
} 