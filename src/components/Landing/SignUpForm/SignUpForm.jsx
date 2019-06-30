import React from "react";

// core components
import Wizard from "../../Interface/Wizard/Wizard.jsx";
import GridContainer from "../../Interface/Grid/GridContainer.jsx";
import GridItem from "../../Interface/Grid/GridItem.jsx";

import Step1 from "./Steps/Step1.jsx";
import Step2 from "./Steps/Step2.jsx";
import './Wizard.css'

class WizardView extends React.Component {
    render() {
        return (
            <GridContainer justify="center" className="imgTitle" style={{
                overflowY: 'scroll',
                '-webkit-overflow-scrolling': 'touch'

            }}> >
                <GridItem xs={12} sm={8} style={{
                    overflowY: 'scroll',
                    overflowX: 'none'
                }}>
                    <Wizard
                        validate
                        steps={[
                            { stepName: "Registeration", stepComponent: Step1, stepId: "Registeration" },
                            { stepName: "Verfication", stepComponent: Step2, stepId: "Verfication" },

                        ]}
                        title="Count Me In!"
                        subtitle="Build Your Profile"
                        finishButtonClick={e => console.log(e)}
                    />
                </GridItem>
            </GridContainer>
        );
    }
}

export default WizardView;
