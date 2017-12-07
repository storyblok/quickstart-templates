require 'sinatra'
require 'storyblok'

configure do
  set :protection, :except => :frame_options
end

helpers do
  def partial(page, options={})
    erb page, options.merge!(:layout => false)
  end
end

get '/favicon.ico' do
  ''
end

get '*' do
  logger = Logger.new(STDOUT)
  slug = params['splat'].join('/')
  slug = slug[1..-1]
  slug = 'home' if slug == '' # Set a default slug for the homepage

  client = Storyblok::Client.new(
    logger: logger,
    cache_version: Time.now.to_i,
    token: 'jdS0oLvdm3Hoj8OILqOcRQtt',
    version: 'draft'
  )

  story = client.story(slug)

  erb :index, locals: {story: story}
end