<?php

return array(
  'imagerSystemPath' => $_SERVER['DOCUMENT_ROOT'] . '/assets/imager/',
  'imagerUrl' => '/assets/imager/',
  'cacheEnabled' => true,
  'cacheDuration' => 31536000, // 1 year
  'jpegQuality' => 90,
  'allowUpscale' => false,
  'interlace' => true,
  'mode' => 'crop',
  'useCwebp' => true,
  'cwebpPath' => '/usr/bin/cwebp',
  'webpQuality' => 85,
  'webpImagickOptions' => array(
    'lossless' => 'true',
    'method' => '5',
  ),
  'jpegoptimEnabled' => true,
  'jpegoptimOptionString' => '-s',
  'optipngEnabled' => true,
  // 'optimizeType' => 'runtime',
  'smartResizeEnabled' => true
);
