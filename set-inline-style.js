// DOM structure should be like this:
// `
// <SOMETAG>
//   <div>
//     <span></span>
//     ...
//   </div>
//   ...
// </SOMETAG>
// `
export default ({
  inlineStyle,
  styleValue,
  isToggleable = true,
  normalValue = `initial`,
  execInElements = [document]
}) => {
  const range = getSelection().getRangeAt(0);
  const commonAncestorContainer = range.commonAncestorContainer;
  // check range not empty and in target
  let fi = [].findIndex.call(execInElements, (value) => {
    return value.contains(commonAncestorContainer);
  });
  if (range.toString() === `` || fi === -1) {
    return;
  }

  const startContainer = range.startContainer;
  const endContainer = range.endContainer;
  const startElement =
    startContainer.nodeName === `#text`
      ? startContainer.parentElement
      : startContainer;
  const endElement =
    endContainer.nodeName === `#text`
      ? endContainer.parentElement
      : endContainer;
  const startLineElement = startElement.parentElement;
  const endLineElement =
    endElement.tagName === `DIV` ? endElement : endElement.parentElement;
  const df = range.cloneContents();
  let spanList = df.querySelectorAll(`span`);
  let divList = df.querySelectorAll(`div`);
  // debugger
  if (spanList.length < 1) {
    let styleStr = startElement.getAttribute(`style`) || ``;
    if (isToggleable) {
      styleValue =
        startElement.style[inlineStyle] === styleValue
          ? normalValue
          : styleValue;
    }
    if (startElement.textContent !== df.textContent) {
      let spanELement = document.createElement(`span`);
      spanELement.setAttribute(`style`, styleStr);
      spanELement.style[inlineStyle] = styleValue;
      range.surroundContents(spanELement);
      const container = document.createElement(`div`);
      container.innerHTML = `<span style="${styleStr}">${
        startElement.childNodes[0].nodeValue
      }</span>${spanELement.outerHTML}<span style="${styleStr}">${
        startElement.childNodes[2].nodeValue
      }</span>`;
      [].filter
        .call(container.children, (element) => {
          return element.textContent === ``;
        })
        .forEach((element) => {
          element.remove();
        });
      startElement.outerHTML = container.innerHTML;
    } else {
      startElement.style[inlineStyle] = styleValue;
    }
  } else if (divList.length < 1) {
    if (isToggleable) {
      styleValue =
        [].findIndex.call(spanList, (element) => {
          return element.style[inlineStyle] !== styleValue;
        }) === -1
          ? normalValue
          : styleValue;
    }
    [].forEach.call(spanList, (element) => {
      element.style[inlineStyle] = styleValue;
    });
    range.deleteContents();
    [].filter
      .call(commonAncestorContainer.querySelectorAll(`span`), (element) => {
        return element.textContent === ``;
      })
      .forEach((element) => {
        element.remove();
      });
    range.insertNode(df);
  } else {
    if (isToggleable) {
      styleValue =
        [].findIndex.call(spanList, (element) => {
          return element.style[inlineStyle] !== styleValue;
        }) === -1
          ? normalValue
          : styleValue;
    }
    [].forEach.call(spanList, (element) => {
      element.style[inlineStyle] = styleValue;
    });
    const firstElementText = df.firstElementChild.firstElementChild.textContent;
    const lastElementText =
      df.lastElementChild.innerHTML === ``
        ? ``
        : df.lastElementChild.lastElementChild.textContent;
    const lineStartText =
      startElement.parentElement.firstElementChild.textContent;
    const lineEndText =
      endElement.tagName === `SPAN`
        ? endElement.parentElement.lastElementChild.textContent
        : endElement.textContent;
    let isFromLineHead = firstElementText === lineStartText;
    let isToLineEnd = lastElementText === lineEndText;
    range.deleteContents();
    [].filter
      .call(commonAncestorContainer.querySelectorAll(`span`), (element) => {
        return element.innerHTML === ``;
      })
      .forEach((element) => {
        element.remove();
      });
    [].filter
      .call(commonAncestorContainer.querySelectorAll(`div`), (element) => {
        return (
          element.querySelector(`span`) === null ||
          (element.firstElementChild.textContent === `` &&
            element.querySelector(`br`) === null)
        );
      })
      .forEach((element) => {
        element.remove();
      });

    if (!isFromLineHead) {
      startLineElement.insertAdjacentHTML(
        `beforeend`,
        df.firstElementChild.innerHTML
      );
      df.firstElementChild.remove();
    }
    if (!isToLineEnd) {
      endLineElement.insertAdjacentHTML(
        `afterbegin`,
        df.lastElementChild.innerHTML
      );
      df.lastElementChild.remove();
    }
    if (df.children.length > 0 && df.lastElementChild.innerHTML === ``) {
      df.lastElementChild.remove();
    }
    range.insertNode(df);
  }
  getSelection().removeAllRanges();
};
