import Vue from "vue";
import Router from "vue-router";
import users from "./components/users";
import login from "./components/login";
import home from "@/components/home";
import journal_entries from "@/components/journal_entries";
import journals from "@/components/journals";
import passwordchecker from "@/components/passwordchecker";
import friendslist from "@/components/friendslist";
import register from "@/components/register";
import landingpage from "@/components/landingpage";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/login",
            name: "login",
            component: login
        },
        {
            path: "/home",
            name: "home",
            component: home
        },
        {
            path: "/journal_entries",
            name: "journal_entries",
            component: journal_entries
        },
        {
            path: "/journals",
            name: "journals",
            component: journals
        },
        {
            path: "/passwordchecker",
            name: "passwordchecker",
            component: passwordchecker
        },
        {
            path: "/users",
            name: "users",
            component: users
        },
        {
            path: "/friendlist",
            name: "friendslist",
            component: friendslist
        },
        {
            path: "/register",
            name: "register",
            component: register
        },
        {
            path: "/landingpage",
            name: "landingpage",
            component: landingpage
        }
    ]
});
