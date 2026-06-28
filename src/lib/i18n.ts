export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Dict = {
  htmlLang: string;
  brand: string;
  nav: { home: string; services: string; approach: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  intro: { heading: string; body: string; stats: { value: string; label: string }[] };
  services: {
    heading: string;
    subheading: string;
    items: { title: string; body: string; points: string[] }[];
  };
  approach: {
    heading: string;
    subheading: string;
    steps: { step: string; title: string; body: string }[];
  };
  ctaBand: { heading: string; body: string; cta: string };
  footer: { tagline: string; location: string; rights: string; nav: string };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      required: string;
      invalidEmail: string;
      optional: string;
    };
    sidebar: { heading: string; body: string; locationLabel: string; location: string };
  };
  notFound: { title: string; body: string; cta: string };
};

export const dictionaries: Record<Locale, Dict> = {
  es: {
    htmlLang: "es",
    brand: "Hashtag Digital",
    nav: { home: "Inicio", services: "Servicios", approach: "Enfoque", contact: "Contacto" },
    hero: {
      eyebrow: "Consultoría de negocio",
      title: "Estrategia y procesos que",
      titleAccent: "mueven el negocio.",
      subtitle:
        "Acompañamos a empresas que quieren decidir mejor, ejecutar más rápido y crecer con foco. Traducimos la estrategia en procesos concretos que el equipo puede llevar adelante.",
      ctaPrimary: "Platiquemos",
      ctaSecondary: "Cómo trabajamos",
    },
    intro: {
      heading: "Cerramos la distancia entre la decisión y la ejecución.",
      body: "Muchas organizaciones tienen claro a dónde quieren llegar, pero se atoran en el cómo. Nuestro trabajo es ordenar esa brecha: un diagnóstico honesto, una estrategia priorizada y procesos que hacen que las cosas pasen.",
      stats: [
        { value: "15+", label: "años de experiencia en gestión y operaciones" },
        { value: "360°", label: "mirada de negocio, procesos y tecnología" },
        { value: "1:1", label: "trabajo cercano con cada cliente" },
      ],
    },
    services: {
      heading: "En qué ayudamos",
      subheading: "Del diagnóstico a la ejecución: estrategia clara y la tecnología que la hace realidad.",
      items: [
        {
          title: "Estrategia de negocio",
          body: "Definimos el rumbo y lo volvemos accionable. Ordenamos prioridades para que el equipo sepa dónde poner la energía.",
          points: [
            "Diagnóstico y definición de rumbo",
            "Modelos de crecimiento y priorización",
            "Métricas e indicadores de gestión",
          ],
        },
        {
          title: "Diagnóstico y transformación",
          body: "Una lectura integral de cómo opera hoy la empresa y una hoja de ruta clara para llevarla al siguiente nivel.",
          points: [
            "Diagnóstico operativo integral",
            "Hoja de ruta de mejora",
            "Acompañamiento en la implementación",
          ],
        },
        {
          title: "Plataformas digitales y apps móviles",
          body: "Diseñamos y desarrollamos plataformas digitales y aplicaciones móviles a la medida para ejecutar el diagnóstico y llevar la estrategia a la operación.",
          points: [
            "Aplicaciones móviles iOS y Android",
            "Plataformas y software web a la medida",
            "Integraciones y automatización",
          ],
        },
      ],
    },
    approach: {
      heading: "Cómo trabajamos",
      subheading: "Un método simple, pensado para dejar capacidad instalada en tu equipo.",
      steps: [
        {
          step: "01",
          title: "Diagnóstico",
          body: "Escuchamos, medimos y entendemos el negocio por dentro. Sin diagnóstico no hay solución que se sostenga.",
        },
        {
          step: "02",
          title: "Diseño",
          body: "Definimos la estrategia y diseñamos los procesos, con prioridades claras y resultados esperados.",
        },
        {
          step: "03",
          title: "Implementación",
          body: "Acompañamos la puesta en marcha y dejamos al equipo con autonomía para sostener la mejora.",
        },
      ],
    },
    ctaBand: {
      heading: "¿Platicamos sobre tu siguiente paso?",
      body: "Cuéntanos en qué estás trabajando y vemos juntos cómo podemos ayudarte.",
      cta: "Ir a contacto",
    },
    footer: {
      tagline: "Consultoría de negocio en estrategia y procesos.",
      location: "Huixquilucan, Estado de México",
      rights: "Todos los derechos reservados.",
      nav: "Navegación",
    },
    contact: {
      eyebrow: "Contacto",
      heading: "Platiquemos sobre tu negocio.",
      body: "Llena el formulario y te respondemos pronto. Cuéntanos brevemente el contexto y qué buscas resolver.",
      form: {
        name: "Nombre",
        email: "Correo",
        company: "Empresa",
        message: "Mensaje",
        submit: "Enviar mensaje",
        sending: "Enviando…",
        success: "¡Gracias! Recibimos tu mensaje y te contactaremos pronto.",
        error: "Hubo un problema al enviar. Inténtalo de nuevo en unos minutos.",
        required: "Este campo es obligatorio.",
        invalidEmail: "Ingresa un correo válido.",
        optional: "Opcional",
      },
      sidebar: {
        heading: "Hashtag Digital",
        body: "Trabajamos con empresas que quieren ordenar su estrategia y profesionalizar sus procesos.",
        locationLabel: "Ubicación",
        location: "Huixquilucan, Estado de México",
      },
    },
    notFound: {
      title: "Página no encontrada",
      body: "La página que buscás no existe o se movió.",
      cta: "Volver al inicio",
    },
  },
  en: {
    htmlLang: "en",
    brand: "Hashtag Digital",
    nav: { home: "Home", services: "Services", approach: "Approach", contact: "Contact" },
    hero: {
      eyebrow: "Business consulting",
      title: "Strategy and processes that",
      titleAccent: "move the business.",
      subtitle:
        "We partner with companies that want to make better decisions, execute faster and grow with focus. We turn strategy into concrete processes your team can actually run.",
      ctaPrimary: "Let's talk",
      ctaSecondary: "How we work",
    },
    intro: {
      heading: "We close the gap between the decision and the execution.",
      body: "Many organizations know where they want to go but get stuck on the how. Our job is to bring order to that gap: an honest diagnosis, a prioritized strategy and processes that make things happen.",
      stats: [
        { value: "15+", label: "years of experience in management and operations" },
        { value: "360°", label: "a view across business, processes and technology" },
        { value: "1:1", label: "close, hands-on work with every client" },
      ],
    },
    services: {
      heading: "How we help",
      subheading: "From diagnosis to execution: clear strategy and the technology to make it real.",
      items: [
        {
          title: "Business strategy",
          body: "We define the direction and make it actionable. We sort out priorities so your team knows where to focus.",
          points: [
            "Diagnosis and direction setting",
            "Growth models and prioritization",
            "Metrics and management indicators",
          ],
        },
        {
          title: "Diagnosis and transformation",
          body: "A holistic read of how the company operates today and a clear roadmap to take it to the next level.",
          points: [
            "End-to-end operational diagnosis",
            "Improvement roadmap",
            "Hands-on implementation support",
          ],
        },
        {
          title: "Digital platforms & mobile apps",
          body: "We design and build custom digital platforms and mobile apps to execute the diagnosis and bring the strategy into day-to-day operations.",
          points: [
            "iOS and Android mobile apps",
            "Custom web platforms and software",
            "Integrations and automation",
          ],
        },
      ],
    },
    approach: {
      heading: "How we work",
      subheading: "A simple method, designed to leave real capability inside your team.",
      steps: [
        {
          step: "01",
          title: "Diagnose",
          body: "We listen, measure and understand the business from the inside. No solution holds without a diagnosis.",
        },
        {
          step: "02",
          title: "Design",
          body: "We define the strategy and design the processes, with clear priorities and expected outcomes.",
        },
        {
          step: "03",
          title: "Implement",
          body: "We support the rollout and leave your team with the autonomy to sustain the improvement.",
        },
      ],
    },
    ctaBand: {
      heading: "Shall we talk about your next step?",
      body: "Tell us what you're working on and let's see how we can help.",
      cta: "Go to contact",
    },
    footer: {
      tagline: "Business consulting in strategy and processes.",
      location: "Huixquilucan, State of Mexico",
      rights: "All rights reserved.",
      nav: "Navigation",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's talk about your business.",
      body: "Fill out the form and we'll get back to you shortly. Briefly tell us the context and what you're looking to solve.",
      form: {
        name: "Name",
        email: "Email",
        company: "Company",
        message: "Message",
        submit: "Send message",
        sending: "Sending…",
        success: "Thank you! We received your message and will reply soon.",
        error: "Something went wrong. Please try again in a few minutes.",
        required: "This field is required.",
        invalidEmail: "Please enter a valid email.",
        optional: "Optional",
      },
      sidebar: {
        heading: "Hashtag Digital",
        body: "We work with companies that want to sharpen their strategy and professionalize their processes.",
        locationLabel: "Location",
        location: "Huixquilucan, State of Mexico",
      },
    },
    notFound: {
      title: "Page not found",
      body: "The page you're looking for doesn't exist or has moved.",
      cta: "Back to home",
    },
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
