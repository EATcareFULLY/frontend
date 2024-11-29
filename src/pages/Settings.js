import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Loading from "../components/Loading";
import {settingsStore} from "../stores/SettingsStore";
import SettingsWrapper from "../components/SettingsWrapper";
import {Button, Container} from "react-bootstrap";
import SettingPreference from "../components/SettingPreference";
import LabelButtonsWrapper from "../components/LabelButtonsWrapper";
import SettingThreshold from "../components/SettingThreshold";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {InfoCircleFill} from "react-bootstrap-icons";


const Settings = observer(() => {

    useEffect(() => {
        async function fetchData() {
            //await settingsStore.createPref();
            //await settingsStore.setupSetting();
            //await settingsStore.checkPref();
            await settingsStore.fetchSettings();
        }

        fetchData();
    }, []);

    const handlePreferenceUpdate = (name, value) => {
        settingsStore.updatePreference(name, value)
    }

    const handleThresholdUpdate = (name, value) => {
        settingsStore.updateThreshold(name, value)
    }

    const handleSave = async () => {
        await settingsStore.updateSettings();
    }

    const handleRevert = async () => {
        await settingsStore.fetchSettings();
    }

    if (!settingsStore.thresholds || settingsStore.getThreshold("Calories")===0) {
        return <Loading />;
    }

    return (
        <Container>
            <h2 className="mb-4">Settings</h2>
            <div>
                <h4 className="mb-4 d-inline-flex align-items-center">
                    Daily nutrition thresholds
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip id="info-tooltip">
                                Minimum and maximum thresholds are set based on dietary guidelines,
                                adapting to your daily caloric intake for balanced nutrition.
                            </Tooltip>
                        }
                    >
                        <InfoCircleFill data-testid="info-tooltip-icon" className="ml-2" style={{cursor: "pointer", fontSize: "1.25rem"}}/>
                    </OverlayTrigger>
                </h4>
                <SettingsWrapper>
                    {Object.entries(settingsStore.thresholds).map(([name, value]) => (
                        <SettingThreshold
                            key={name}
                            name={name}
                            value={value}
                            unit={name === "Calories" ? 'kcal' : 'g'}
                            valueRange={settingsStore.getDynamicRangeForNutrient(name)}
                            onUpdate={handleThresholdUpdate}
                        />
                    ))}
                </SettingsWrapper>
                <h4 className="mb-4 mt-2">Recommendation preferences</h4>
                <SettingsWrapper>
                    {Object.entries(settingsStore.preferences).map(([name, wanted]) => (
                        <SettingPreference
                            key={name}
                            name={name}
                            wanted={wanted}
                            onUpdate={handlePreferenceUpdate}
                        />
                    ))}
                </SettingsWrapper>
                <LabelButtonsWrapper>
                    <Button onClick={handleRevert}>Revert</Button>
                    <Button onClick={handleSave}>Save</Button>
                </LabelButtonsWrapper>
            </div>
        </Container>
    );
});

export default Settings;