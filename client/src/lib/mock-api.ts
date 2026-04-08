type MockUser = {
  id: number;
  username: string;
  email: string;
  role: "student" | "teacher" | "admin";
  user_number?: number;
};

type MockAuthRole = "student" | "teacher" | "admin";

type MockAuthState = { 
  authenticated: boolean;
  role: MockAuthRole;
};

const AUTH_STORAGE_KEY = "lis_ui_auth_state";

const demoStudent: MockUser = {
  id: 1,
  username: "lis_student",
  email: "student@learners.international",
  role: "student",
  user_number: 1001,
};

const demoAdmin: MockUser = {
  id: 999,
  username: "lis_admin",
  email: "admin@learners.international",
  role: "admin",
};

const demoTeacher: MockUser = {
  id: 2,
  username: "lis_teacher",
  email: "teacher@learners.international",
  role: "teacher",
};

const demoCourses = [
  {
    id: "cambridge-english",
    title: "Cambridge English",
    level: "Cambridge",
    description: "Reading, writing, and language analysis aligned to Cambridge curriculum expectations.",
    tag: "Cambridge",
    country: "INTERNATIONAL",
    price: 0,
    currency: "INR",
    isFree: true,
    hasAccess: true,
    imageUrl: null,
  },
  {
    id: "ib-english-language-literature",
    title: "IB English Language & Literature",
    level: "IB",
    description: "Textual interpretation, writing skills, and critical thinking aligned to IB standards.",
    tag: "IB",
    country: "INTERNATIONAL",
    price: 0,
    currency: "INR",
    isFree: true,
    hasAccess: true,
    imageUrl: null,
  },
  {
    id: "cambridge-mathematics",
    title: "Cambridge Mathematics",
    level: "Cambridge",
    description: "Concept-first mathematics with application, fluency, and problem-solving progression.",
    tag: "Cambridge",
    country: "INTERNATIONAL",
    price: 0,
    currency: "INR",
    isFree: true,
    hasAccess: true,
    imageUrl: null,
  },
  {
    id: "ib-mathematics",
    title: "IB Mathematics",
    level: "IB",
    description: "Reasoning, modelling, and mathematical communication aligned to IB pathways.",
    tag: "IB",
    country: "INTERNATIONAL",
    price: 0,
    currency: "INR",
    isFree: true,
    hasAccess: true,
    imageUrl: null,
  },
  {
    id: "cambridge-science",
    title: "Cambridge Science",
    level: "Cambridge",
    description: "Integrated Science foundation across Biology, Chemistry, and Physics concepts.",
    tag: "Cambridge",
    country: "INTERNATIONAL",
    price: 0,
    currency: "INR",
    isFree: true,
    hasAccess: true,
    imageUrl: null,
  },
  {
    id: "ib-integrated-sciences",
    title: "IB Integrated Sciences",
    level: "IB",
    description: "Inquiry-based scientific exploration and interdisciplinary understanding for IB learners.",
    tag: "IB",
    country: "INTERNATIONAL",
    price: 0,
    currency: "INR",
    isFree: true,
    hasAccess: true,
    imageUrl: null,
  },
];

const demoCourseDetail = {
  id: "cambridge-english",
  title: "Cambridge English",
  course_title: "Cambridge English",
  level: "Cambridge",
  description: "Frontend-only course detail for Cambridge and IB preview.",
  modules: [
    {
      id: 1,
      week: 1,
      title: "Welcome Module",
      description: "Introduction to the UI-only learner flow.",
      topics: [
        {
          id: "topic-1",
          title: "Orientation",
          content: "This is mock content running without a backend.",
          order_index: 1,
          estimated_time: 10,
        },
      ],
    },
  ],
};

const demoBlogs = [
  {
    id: "blog-1",
    slug: "welcome-to-lis",
    title: "Welcome to Learners International School",
    excerpt: "This is a UI-only demo blog entry.",
    content: "This blog content is mocked for frontend-only preview mode.",
    imageUrl: null,
    createdAt: new Date().toISOString(),
  },
];

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function parseBody(body?: BodyInit | null): Record<string, unknown> {
  if (typeof body !== "string" || !body) return {};
  try {
    return JSON.parse(body) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function getDefaultAuthState(): MockAuthState {
  return { authenticated: false, role: "student" };
}

function readAuthState(): MockAuthState {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return getDefaultAuthState();
    const parsed = JSON.parse(raw) as Partial<MockAuthState>;
    if (!parsed || typeof parsed.authenticated !== "boolean") return getDefaultAuthState();
    const role: MockAuthRole =
      parsed.role === "admin" || parsed.role === "teacher" || parsed.role === "student"
        ? parsed.role
        : "student";
    return { authenticated: parsed.authenticated, role };
  } catch {
    return getDefaultAuthState();
  }
}

function writeAuthState(state: MockAuthState) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

function clearAuthState() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getUserByRole(role: MockAuthRole): MockUser {
  if (role === "admin") return demoAdmin;
  if (role === "teacher") return demoTeacher;
  return demoStudent;
}

function resolveRoleFromAuthPath(path: string): MockAuthRole {
  if (path.includes("/admin")) return "admin";
  if (path.includes("/teacher")) return "teacher";
  return "student";
}

function handleMockApi(url: URL, init?: RequestInit): Response {
  const method = (init?.method || "GET").toUpperCase();
  const path = url.pathname;
  const authState = readAuthState();

  if (path === "/api/health") {
    return json({ status: "ok", message: "UI-only mock API is running" });
  }

  if (path === "/api/session") {
    if (!authState.authenticated) {
      return json({ authenticated: false, user: null, additionalInfo: {} });
    }
    return json({ authenticated: true, user: getUserByRole(authState.role), additionalInfo: {} });
  }

  if (path === "/api/admin/session") {
    if (!authState.authenticated || authState.role !== "admin") {
      return json({ authenticated: false, user: null });
    }
    return json({ authenticated: true, user: demoAdmin });
  }

  if (path === "/api/logout") {
    clearAuthState();
    return json({ success: true });
  }

  if (path === "/api/courses-with-pricing") {
    return json({ courses: demoCourses });
  }

  if (path === "/api/courses") {
    if (method === "GET") return json(demoCourses);
    return json({ success: true, course: demoCourses[0] });
  }

  if (/^\/api\/course\/[^/]+\/access$/.test(path)) {
    return json({ hasAccess: true });
  }

  if (/^\/api\/course\/[^/]+$/.test(path)) {
    const id = decodeURIComponent(path.split("/").pop() || "cambridge-english");
    const matchedCourse = demoCourses.find((course) => course.id === id);
    return json({
      ...demoCourseDetail,
      id,
      title: matchedCourse?.title || `Course ${id}`,
      course_title: matchedCourse?.title || `Course ${id}`,
      description: matchedCourse?.description || demoCourseDetail.description,
      level: matchedCourse?.level || demoCourseDetail.level,
    });
  }

  if (path === "/api/blogs") {
    return json({ blogs: demoBlogs });
  }

  if (/^\/api\/blogs\/[^/]+$/.test(path)) {
    const slug = decodeURIComponent(path.split("/").pop() || "welcome-to-lis");
    const blog = demoBlogs.find((b) => b.slug === slug) || { ...demoBlogs[0], slug, title: slug.replace(/-/g, " ") };
    return json({ blog });
  }

  if (path === "/api/check-user") {
    const body = parseBody(init?.body);
    return json({
      exists: true,
      role: "student",
      email: body.email || demoStudent.email,
    });
  }

  if (path === "/api/check-username") {
    return json({ available: true });
  }

  if (path.startsWith("/api/signin") || path.startsWith("/api/signup")) {
    const role = resolveRoleFromAuthPath(path);
    writeAuthState({ authenticated: true, role });
    return json({
      success: true,
      user: getUserByRole(role),
      redirectUrl: "/courses",
    });
  }

  if (path === "/api/additional-info") {
    const body = parseBody(init?.body);
    return json({ success: true, additionalInfo: body });
  }

  if (path === "/api/payment/initialize") {
    return json({
      ccavenueUrl: "#",
      encryptedData: "demo-encrypted-data",
      accessCode: "demo-access-code",
    });
  }

  if (path === "/api/admin/dashboard") {
    return json({ data: {} });
  }

  if (path.startsWith("/api/admin")) {
    return json({ success: true, data: [] });
  }

  return json({ success: true, mock: true, path, method });
}

export function enableUiOnlyMockApi() {
  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const rawUrl = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    let url: URL;
    try {
      url = new URL(rawUrl, window.location.origin);
    } catch {
      return nativeFetch(input as RequestInfo, init);
    }

    if (!url.pathname.startsWith("/api")) {
      return nativeFetch(input as RequestInfo, init);
    }

    return Promise.resolve(handleMockApi(url, init));
  };
}
