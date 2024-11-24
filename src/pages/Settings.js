import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Loading from "../components/Loading";
import {settingsStore} from "../stores/SettingsStore";
import SettingsWrapper from "../components/SettingsWrapper";
import {Button, Container} from "react-bootstrap";
import SettingPreference from "../components/SettingPreference";
import LabelButtonsWrapper from "../components/LabelButtonsWrapper";
import SettingThreshold from "../components/SettingThreshold";


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

    const handleSave = async (name, value) => {
        await settingsStore.updateSettings();
    }

    const handleRevert = async (name, value) => {
        await settingsStore.fetchSettings();
    }

    if (!settingsStore.thresholds) {
        return <Loading />;
    }

    return (
        <Container>
            <h1 className="mb-4">Settings</h1>
            <div >
                <h4 className="mb-4">Nutrition thresholds</h4>
                <SettingsWrapper>
                    {Object.entries(settingsStore.thresholds).map(([name, value]) => (
                        <SettingThreshold
                            key={name}
                            name={name}
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
                            onUpdate={handlePreferenceUpdate}
                        />
                    ))}
                </SettingsWrapper>
                <LabelButtonsWrapper>
                    <Button onClick={handleRevert} >Revert</Button>
                    <Button onClick={handleSave}>Save</Button>
                </LabelButtonsWrapper>
            </div>
        </Container>
    );
});

export default Settings;