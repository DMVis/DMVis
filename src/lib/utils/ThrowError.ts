export function ThrowError(
  title: string = 'Error',
  message: string = 'Oops, something went wrong!',
  component: string = 'DMVis'
) {
  // Define stylings that can be applied for every node
  const textStyle = 'color: red; margin: 0; font-family: Verdana, Geneva, sans-serif !important;';
  const containerStyle =
    'position: absolute; right: 20px; top: 20px; display: flex; flex-direction: column; gap: 8px; border: 2px solid red; padding: 8px; border-radius: 8px; max-width: 400px; flex-wrap: wrap; z-index: 100;';

  // All the nodes that need to be added to the DOM together with their textNode
  const containerNode = document.createElement('div');
  const titleNode = document.createElement('h1');
  const messageNode = document.createElement('p');
  const componentNode = document.createElement('p');

  titleNode.appendChild(document.createTextNode(title));
  messageNode.appendChild(document.createTextNode(message));
  componentNode.appendChild(document.createTextNode(`This error originated from ${component}.`));

  // Apply styling
  containerNode.style.cssText = containerStyle;
  titleNode.style.cssText = textStyle;
  messageNode.style.cssText = textStyle;
  componentNode.style.cssText = textStyle;

  // Add DOM elements to html body
  containerNode.appendChild(titleNode);
  containerNode.appendChild(messageNode);
  containerNode.appendChild(componentNode);

  document.body.appendChild(containerNode);

  // Lastly, throw an error so it also appears in the console
  throw new Error(`${component} - ${title}: ${message}`);
}
