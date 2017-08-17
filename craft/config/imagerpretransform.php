<?php

return [
    'transforms' => [
        'posts' => [
            // JPG
            [
                'format' => 'jpg',
                'width' => 1000,
            ],
            [
                'format' => 'jpg',
                'width' => 667,
            ],
            [
                'format' => 'jpg',
                'width' => 400,
            ],
            // WEBP
            [
                'format' => 'webp',
                'width' => 1000,
            ],
            [
                'format' => 'webp',
                'width' => 667,
            ],
            [
                'format' => 'webp',
                'width' => 400,
            ],
            'defaults' => [
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                },
                'allowUpscale' => 'false',
                'mode' => 'crop',
                'interlace' => 'true'
            ]
        ],
        'staff' => [
            [
                'width' => 500,
                'format' => 'jpg'
            ],
            [
                'width' => 500,
                'format' => 'webp'
            ],
            'defaults' => [
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => 1 / 1,
                'allowUpscale' => 'false',
                'mode' => 'crop',
                'interlace' => 'true'
            ]
        ],
        'global' => [
            [
                'format' => 'jpg',
                'width' => 1000
            ],
            [
                'format' => 'jpg',
                'width' => 667
            ],
            [
                'format' => 'jpg',
                'width' => 400
            ],
            // WEBP
            [
                'format' => 'webp',
                'width' => 1000
            ],
            [
                'format' => 'webp',
                'width' => 667
            ],
            [
                'format' => 'webp',
                'width' => 400
            ],
            'defaults' => [
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                },
                'allowUpscale' => 'false',
                'mode' => 'crop',
                'interlace' => 'true'
            ]
        ]
    ]
];