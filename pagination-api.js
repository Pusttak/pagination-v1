export const Pagination = class {
  constructor(name) {
    this.page = 1;
    this.buttonsList = [];
    this.event = null;
    this.name = name;
  }
  get currentPage() {
    return this.page;
  }
  set currentPage(newPage) {
    this.page = newPage;
  }
  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
    sessionStorage.setItem(`${this.name}Page`, JSON.stringify(this.page));
  }

  addPaginationEvent(event) {   
    this.event = event;
  }
  
  create({ prelink, totalPages, step = 6, arrows = true, dots = true }) {
    const savePage = sessionStorage.getItem(`${this.name}Page`);
    if (savePage) {
      this.page = JSON.parse(savePage);
    }

    if (totalPages <= step) {
      dots = false;
    }

    if (totalPages > 1) {
    const paginationWrap = document.createElement("ul");
    paginationWrap.classList.add('pagination-wrap')
    prelink.append(paginationWrap);

    paginationWrap.addEventListener('click', onButtonClick.bind(this));

    function onButtonClick(e) {
      if (e.target.hasAttribute('data-pagination')) {
        switch (e.target.dataset.pagination) {
          case 'next':
            if (this.page < totalPages) {
              this.incrementPage()
            };
            break;
            
          case 'prev':
            if (this.page > 1) {
              this.decrementPage();
            };
            break;

          default:
            this.page = Number(e.target.getAttribute('data-pagination'));
            break;
        }

        sessionStorage.setItem(`${this.name}Page`, JSON.stringify(this.page));
        this.event();
        this.render(arrows, step, dots);
      }
    }

    const paginationPageButtons = () => {
      for (let i = 1; i <= totalPages; i += 1) {
        const buttonClass = ['pagination-btn'];
        if (i === this.page) buttonClass.push('pagination-btn--active');
        this.buttonsList.push(`<li><button type='submit' name="page" class='${buttonClass.join(' ')}' data-pagination=${i}>${i}</button></li>`);
      }
    }    
      paginationPageButtons();
      this.render(arrows, step, dots);
     }
  }

  render(arrows, step, dots) {
    const paginationWrap = document.querySelector('.pagination-wrap');
    const buttonNext = arrows ? `<li><button type='button' class='pagination-btn pagination-btn--arrow' data-pagination='next'>Next</button></li>` : null;
    const buttonPrev = arrows ? `<li><button type='button' class='pagination-btn pagination-btn--arrow' data-pagination='prev'>Prev</button></li>` : null;
    const paginationDots = '<li><span class="pagination-btn--dots">...</span></li>';

    let startSlice = 0;
    let endSlice = this.buttonsList.length;
    const currentIdx = this.page - 1;

    if (this.page >= step && this.buttonsList.length - currentIdx >= step) {
      startSlice = this.page - step / 2 + (dots ? 1 : 0);
      endSlice = this.page + step / 2 - (dots ? 1 : 0);
    }
    else if (this.page < step) {
      startSlice = 0;
      endSlice = step;
    }
    else if (this.buttonsList.length - currentIdx < step) {
      startSlice = -step;
      endSlice = this.buttonsList.length;
    }
    
    const numBtns = this.buttonsList.slice(startSlice, endSlice);
    const firstNumBtn = dots ? startSlice !== 0 ? [...this.buttonsList.slice(0, 1), paginationDots] : [] : [];
    const lastNumBtn = dots ? endSlice !== this.buttonsList.length ? [paginationDots, ...this.buttonsList.slice(-1)] : [] : [];
    const allButtons = [buttonPrev, ...firstNumBtn, ...numBtns, ...lastNumBtn, buttonNext,];

    paginationWrap.innerHTML = allButtons.join('');

    const currentActiveBtn = document.querySelector('.pagination-btn--active')
    currentActiveBtn?.classList.remove('pagination-btn--active');
  
    const activeBtn = document.querySelector(`.pagination-btn[data-pagination='${this.page}']`);
    activeBtn.classList.add('pagination-btn--active');
  }
}