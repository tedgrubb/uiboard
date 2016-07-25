module ApplicationHelper
  def spaceless(&block)
    contents = capture(&block)
    contents.strip.gsub(/>\s+</, '><').html_safe
  end
end
