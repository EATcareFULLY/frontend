import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Loading from "../components/Loading";
import {settingsStore} from "../stores/SettingsStore";
import SettingsWrapper from "../components/SettingsWrapper";
import {Container} from "react-bootstrap";
import SettingPreference from "../components/SettingPreference";


const Settings = observer(() => {

    useEffect(() => {
        async function fetchData() {
            //await settingsStore.createPref();
            //await settingsStore.setupSetting();
            //await settingsStore.checkPref();
            await settingsStore.fetchSettings();
        }

        fetchData();

        return () => {
            settingsStore.updateSettings();
        };
    }, []);

    const handlePreferenceUpdate = (name, value) => {
        settingsStore.updatePreference(name, value)
    }

    if (!settingsStore.thresholds) {
        return <Loading />;
    }

    return (
        <Container>
            <h1>Settings</h1>
            <div className="text-left">
                <h3>Nutrition thresholds</h3>
                <SettingsWrapper>

                </SettingsWrapper>
                <h3>Recommendation preferences</h3>
                <SettingsWrapper>
                    {settingsStore.preferences.map((preference) => (
                        <SettingPreference
                            key={preference.name}
                            name={preference.name}
                            initialWanted={preference.wanted}
                            onUpdate={handlePreferenceUpdate}
                        />
                    ))}
                </SettingsWrapper>
            </div>
        </Container>
    );
});

export default Settings;