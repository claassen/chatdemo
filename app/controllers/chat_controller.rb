class ChatController < ApplicationController
  def sendmessage
    text = params[:message]
    receiver = params[:to]

    message = Message.new
    message.to = receiver
    message.from = current_user.email
    message.message = text
    message.received = false

    message.save

    render :nothing => true
  end

  def getmessages
    
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
