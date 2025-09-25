export const generateTicketImage = async (ticketElement: HTMLElement): Promise<Blob> => {
  const html2canvas = (await import('html2canvas')).default;

  try {
    const canvas = await html2canvas(ticketElement, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: ticketElement.offsetWidth,
      height: ticketElement.offsetHeight,
      foreignObjectRendering: false,
      removeContainer: false,
      imageTimeout: 30000,
      scrollX: 0,
      scrollY: 0,
      windowWidth: ticketElement.offsetWidth,
      windowHeight: ticketElement.offsetHeight,
      ignoreElements: (element) => {
        return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
      },
      onclone: (clonedDoc) => {
        const clonedTicket = clonedDoc.querySelector(`[data-ticket-id="${ticketElement.getAttribute('data-ticket-id')}"]`);
        if (clonedTicket) {
          const computedStyle = window.getComputedStyle(ticketElement);
          const clonedElement = clonedTicket as HTMLElement;

          clonedElement.style.cssText = computedStyle.cssText;
          clonedElement.style.position = 'relative';
          clonedElement.style.transform = 'none';
          clonedElement.style.opacity = '1';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.display = 'block';

          const images = clonedElement.querySelectorAll('img');
          images.forEach((img) => {
            const imgElement = img as HTMLImageElement;
            const originalImg = ticketElement.querySelector(`img[src="${imgElement.getAttribute('src')}"]`) as HTMLImageElement;
            if (originalImg) {
              imgElement.src = originalImg.src;
            }
          });
        }
      }
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Error al convertir canvas a blob'));
        }
      }, 'image/png', 1.0);
    });
  } catch {
    throw new Error('No se pudo capturar el ticket');
  }
};
