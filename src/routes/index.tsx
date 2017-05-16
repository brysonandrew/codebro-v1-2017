import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';

import {BackgroundFromStore} from "../Widgets/Background/Background";

import { ShowroomIndex } from '../App/Showroom/Showroom';
import { SphinxContainerFromStore }
    from '../App/Showroom/Sites/Sphinx/SphinxContainer';
import { CyclopsContainerFromStore }
    from '../App/Showroom/Sites/Cyclops/CyclopsContainer';

import { WorkshopIndex } from '../App/Workshop/Workshop';
//examples
import  { TransitionContainerFromStore }
    from '../App/Workshop/Examples/TransitionCrashTest/TransitionContainer';
import  { THREEjsBasicSetup }
    from '../App/Workshop/Examples/THREEjsBasicSetup/THREEjsBasicSetup';
import  { IntroHeader }
    from '../Widgets/IntroHeader/IntroHeader';
//projects
import { GatlingGunContainerFromStore }
from '../App/Workshop/Projects/GatlingGun/GatlingGunContainer';
import { WalkingPhysicsContainerFromStore }
from '../App/Workshop/Projects/WalkingPhysics/WalkingPhysicsContainer';
import { Create3DSword }
    from '../App/Workshop/Projects/Create3DSword/Create3DSword';

import { HomeFromStore } from '../Home/Home';

const routes = (
        <Route component={App}>
            <Route path="/background" component={BackgroundFromStore}/>
            {/*showroom*/}
            <Route path="/showroom" component={ShowroomIndex}/>
            <Route path="/showroom/sphinx" component={SphinxContainerFromStore}/>
            <Route path="/showroom/cyclops" component={CyclopsContainerFromStore}/>
            {/*//examples*/}
            <Route path="/workshop" component={WorkshopIndex}/>
            <Route path="/workshop/transition-crash-test" component={TransitionContainerFromStore}/>
            <Route path="/workshop/threejs-basic-setup" component={THREEjsBasicSetup}/>
            <Route path="/workshop/code-bro" component={IntroHeader}/>
            {/*//projects*/}
            <Route path="/workshop/gatling-gun" component={GatlingGunContainerFromStore}/>
            <Route path="/workshop/walking-physics" component={WalkingPhysicsContainerFromStore}/>
            <Route path="/workshop/create-a-3d-sword" component={Create3DSword}/>
            {/*//main*/}
            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
