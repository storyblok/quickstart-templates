<?php

require 'vendor/autoload.php';

// Defines templates
// This is usually handled by the template engine using seperate files.
class Components
{
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
      return $this->_get($blok, '_editable') . '<div class="teaser">' . $this->_get($blok, 'name') . '</div>';
    }

    function _get($blok, $key) {
      return isset($blok[$key]) ? $blok[$key] : '';
    }
}

// Simple rendering engine
// Replace that with twig or other template engine of your preference.
function renderBlocks($data) {
  $components = new Components();

  foreach ($data['story']['content']['body'] as $blok) {
    echo $components->{$blok['component']}($blok);
  }
}

// Handles catch all route
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$slug = empty($path) ? 'home' : $_SERVER['REQUEST_URI'];

$client = new \Storyblok\Client('jdS0oLvdm3Hoj8OILqOcRQtt');
$client->getStoryBySlug($slug);
$response = $client->getStoryContent();

renderBlocks($response);