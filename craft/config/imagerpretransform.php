<?php

return [
    'transforms' => [
        'about' => [
            //JPG
            [
                'format' => 'jpg',
                'jpegQuality' => 90,
                'width' => function ($asset) {
                    if ($asset->width > $asset->height) {
                        return 1800;
                    } else {
                        return 1200;
                    }
                },
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
            ],
            [
                'format' => 'jpg',
                'jpegQuality' => 90,
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
            ],
            [
                'format' => 'jpg',
                'jpegQuality' => 90,
                'width' => 500,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
            ],
            //WEBP
            [
                'format' => 'webp',
                'webpQuality' => 90,
                'width' => function ($asset) {
                    if ($asset->width > $asset->height) {
                        return 1800;
                    } else {
                        return 1200;
                    }
                },
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
            ],
            [
                'format' => 'webp',
                'webpQuality' => 90,
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
            ],
            [
                'format' => 'webp',
                'webpQuality' => 90,
                'width' => 500,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
            ]
        ],
        'global' => [
            //JPG
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
            ],
            [
                'format' => 'jpg',
                'width' => 400,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
            ],
            //WEBP
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
            ],
            [
                'format' => 'webp',
                'width' => 400,
                'position' => function ($asset) {
                    return $asset->focalPoint;
                },
            ],
        ],
        'partners' => [
            [
                'format' => 'png',
                'width' => 400,
                'ratio' => function ($asset) {
                    return $asset->width / $asset->height;
                }
            ]
        ],
        'posts' => [
            //JPG
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
            //WEBP
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
            ],
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
        ]
    ]
];