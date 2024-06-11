<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\config\GeneralConfig;
use craft\helpers\App;

return [
    '*' => [
        // Applies to all environments:
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'allowAdminChanges' => true,
        'cpTrigger' => 'scroll',
        'extraAllowedFileExtensions' => 'usdz, glb',
    ],

    'dev' => [
        // Only applies to development environments, overriding anything in `*`:
        'allowAdminChanges' => true,
        'devMode' => true,
        'extraAllowedFileExtensions' => 'usdz, glb',
    ],

    'production' => [
        // Only applies to the production environment, overriding anything in `*`:
        'allowAdminChanges' => true,
        'preventUserEnumeration' => true,
        'extraAllowedFileExtensions' => 'usdz, glb',
    ],
];
