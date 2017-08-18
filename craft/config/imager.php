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
  'webpQuality' => 85,
  'webpImagickOptions' => array(
    'lossless' => 'true',
    'method' => '5',
  ),
  'jpegoptimEnabled' => true,
  'jpegoptimPath' => '/usr/bin/jpegoptim',
  'jpegoptimOptionString' => '-s',
  'optipngEnabled' => true,
  'optipngPath' => '/usr/bin/optipng',
  'optimizeType' => 'runtime',
  'smartResizeEnabled' => true
);
