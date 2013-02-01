class ChatController < ApplicationController
  def sendmessage
  	text = params[:message]
  	sender = params[:userEmail]
  	receiver = params[:to]

  	message = Message.new
  	message.to = receiver
  	message.from = sender
  	message.message = text
  	message.received = false

  	message.save

  	render :nothing => true
  end

  def getmessages
  	# messages = Message.find_by_to(current_user.email)
  	messages = Message.where(:received => false, :to => current_user.email);

  	messages.each do |msg| 
      msg.received = true
      msg.save
  	end

  	respond_to do |format|
      format.json { render :json => messages }
    end
  end
end
