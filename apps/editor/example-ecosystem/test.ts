const CoreConfigV2 = Packages.xyz.wagyourtail.jsmacros.core.config.CoreConfigV2;

// Access the main JsMacros instance to get ConfigManager
const configManager = JsMacros.getConfig();

// Access profile configurations
const coreConfig = configManager.getOptions(CoreConfigV2);

if (coreConfig) {
    // List all profiles
    const profiles = coreConfig.profileOptions();
    profiles.forEach(profileName => {
        Chat.log(`Profile: ${profileName}`);

        // Get triggers for this profile
        const triggers = coreConfig.profiles.get(profileName);
        if (triggers) {
            Chat.log(`  Triggers in ${profileName}: ${triggers.length}`);
            triggers.forEach(trigger => {
                Chat.log(`    - ${trigger.triggerType}: ${trigger.scriptFile}`);
            });
        }
    });
}