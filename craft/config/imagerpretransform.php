<?php

return [
    'transforms' => [
        'posts' => [
            // JPG
            [
                'format' => 'jpg',
                'width' => function ($asset) {
                    if ($asset->width > $asset->height) {
                        return 1000;
                    } else {
                        return 667;
                    }
                },
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ],
            [
                'format' => 'jpg',
                'width' => 500,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ],
            // WEBP
            [
                'format' => 'webp',
                'width' => function ($asset) {
                    if ($asset->width > $asset->height) {
                        return 1000;
                    } else {
                        return 667;
                    }
                },
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ],
            [
                'format' => 'webp',
                'width' => 500,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ]
        ],
        'staff' => [
            [
                'format' => 'jpg',
                'width' => 500,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => 1 / 1
            ],
            [
                'format' => 'webp',
                'width' => 500,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => 1 / 1
            ]
        ],
        'global' => [
            [
                'format' => 'jpg',
                'width' => function ($asset) {
                    if ($asset->width > $asset->height) {
                        return 1000;
                    } else {
                        return 667;
                    }
                },
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ],
            [
                'format' => 'jpg',
                'width' => 400,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ],
            // WEBP
            [
                'format' => 'webp',
                'width' => function ($asset) {
                    if ($asset->width > $asset->height) {
                        return 1000;
                    } else {
                        return 667;
                    }
                },
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ],
            [
                'format' => 'webp',
                'width' => 400,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ]
        ]
    ]
];