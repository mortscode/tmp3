<?php

return array(
  'imagerSystemPath' => $_SERVER['DOCUMENT_ROOT'] . '/assets/imager/',
  'imagerUrl' => '/assets/imager/',
  'cacheEnabled' => true,
  'cacheDuration' => 31536000, // 1 year
  'jpegQuality' => 85,
  'allowUpscale' => false,
  'smartResizeEnabled' => true,
  'interlace' => true,
  'mode' => 'crop',
  'instanceReuseEnabled' => true,
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
  'optipngOptionString' => '-o5',
  'optimizeType' => 'runtime',
);
