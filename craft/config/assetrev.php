<?php
return array(
    '*' => array(
        'strategies' => [
            'manifest' => AssetRev\Utilities\Strategies\ManifestFileStrategy::class,
            'querystring' => AssetRev\Utilities\Strategies\QueryStringStrategy::class,
            'passthrough' => function ($filename, $config) {
                return $filename;
            },
        ],
        'pipeline' => 'manifest|querystring|passthrough',
        'manifestPath' => '../public/assets/rev-manifest.json',
        'assetsBasePath' => '../public/assets/',
        'assetUrlPrefix' => '/assets/resources/',
    ),
);