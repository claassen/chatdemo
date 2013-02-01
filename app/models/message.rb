class Message < ActiveRecord::Base
  attr_accessible :from, :message, :received, :to
end
