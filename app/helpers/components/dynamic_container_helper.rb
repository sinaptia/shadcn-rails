module Components::DynamicContainerHelper
  # First and last columns are empty to center the content
  # In this way you can extend a single section just changing the range of columns.
  COLUMNS_SETUP = "grid-cols-[1fr minmax(0, 75rem) 1fr]".freeze
  ITEM_CENTERED_CLASSES = "col-start-2 col-end-3".freeze
  FULL_SIZE_CLASSES = "not-center col-start-1 col-end-4".freeze
  FREE_ITEM = "not-center"

  def render_dynamic_container(classes:, &block)
    content = capture(&block) if block
    render "components/dynamic_container", content: content, classes: classes
  end
end