<!DOCTYPE html>
<html>
<head>
  <title></title>
  <style type="text/css">
    body {
      font-family: sans-serif;
    }

    .teaser,
    .column {
      font-size: 2rem;
      text-align: center;
      line-height: 3;
      background: #ebeff2;
      border-radius: 10px;
      margin: 10px 5px;
    }

    .grid {
      display: flex;
    }

    .column {
      flex: 1;
    }
  </style>
</head>
<body>
<?php

require 'vendor/autoload.php';

// Defines templates
// This is usually handled by the template engine using seperate files.
class Components
{
  function page($blok)
  {
    $content = '';
    foreach ($this->_get($blok, 'body') as $innerblok) {
      $content .= $this->{$innerblok['component']}($innerblok);
    }
    return $content;
  }

  function teaser($blok)
  {
    return $this->_get($blok, '_editable') . '<div class="teaser">' . $this->_get($blok, 'headline') . '</div>';
  }

  function grid($blok) {
    $content = '<div class="grid">';
    foreach ($this->_get($blok, 'columns') as $innerblok) {
      $content .= $this->{$innerblok['component']}($innerblok);
    }
    $content .= '</div>';
    return $content;
  }

  function feature($blok) {
    return $this->_get($blok, '_editable') . '<div class="column teaser">' . $this->_get($blok, 'name') . '</div>';
  }

  function _get($blok, $key) {
    return isset($blok[$key]) ? $blok[$key] : '';
  }
}

// Simple rendering engine
// Replace that with twig or other template engine of your preference.
function renderBlocks($data) {
  $components = new Components();
  $blok = $data['story']['content'];

  echo $components->{$blok['component']}($blok);
}

// Handles catch all route
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$slug = empty($path) ? 'home' : $_SERVER['REQUEST_URI'];

$client = new \Storyblok\Client('jdS0oLvdm3Hoj8OILqOcRQtt');
$client->getStoryBySlug($slug);
$response = $client->getStoryContent();

renderBlocks($response);

?>
<script src="//app.storyblok.com/f/storyblok-latest.js?t=jdS0oLvdm3Hoj8OILqOcRQtt"></script>
</body>
</html>