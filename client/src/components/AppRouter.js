import React, {useContext} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import {protectedRoutes, publicRoutes} from "../routers/routes";
import {Context} from "../index";
import {observer} from "mobx-react";


const AppRouter = observer (() => {
    const {user}=useContext(Context)
    console.log(user)
    return (
        <Switch>
            {user.isAuth && protectedRoutes.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
            )},
            {publicRoutes.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={{pathname:'/'}} />
        </Switch>

    );
});

export default AppRouter;