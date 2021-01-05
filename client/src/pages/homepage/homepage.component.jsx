import React from 'react';
import Directory from '../../components/directory/directory.component';

import { HomepageContainer } from "./homepage.styles"


const HomePage = () => {
    return (
        <HomepageContainer className="homepage">
            <Directory/>
        </HomepageContainer>
    )
}
export default HomePage