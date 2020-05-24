import Vue from "vue";
import VueRouter from "vue-router";
import Example from "./components/ExampleComponent.vue";
import ContactsCreate from "./components/views/ContactsCreate.vue";
import ContactsShow from "./components/views/ContactsShow.vue";
import ContactsEdit from "./components/views/ContactsEdit.vue";
import ContactsIndex from "./components/views/ContactsIndex.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: "/", component: Example },
        { path: "/contacts", component: ContactsIndex },
        { path: "/contacts/create", component: ContactsCreate },
        { path: "/contacts/:id", component: ContactsShow },
        { path: "/contacts/:id/edit", component: ContactsEdit }
    ],
    mode: "history"
});
