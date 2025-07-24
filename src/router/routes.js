export default [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HomePage.vue"),
      },
      {
        path: "jobs",
        component: () => import("src/pages/JobDashboard.vue"), // 👈 new route
      },
      
    
      {
        path: "login",
        component: () => import("src/pages/RegisterForm.vue"), // 👈 new route
      },  
     
    ],
  },
];
