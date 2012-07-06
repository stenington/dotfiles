" Make vim more useful
set nocompatible
" Use the OS clipboard by default (on versions compiled with `+clipboard`)
set clipboard=unnamed
" Enhance command-line completion
set wildmenu
" Allow cursor keys in insert mode
set esckeys
" Optimize for fast terminal connections
set ttyfast
" Add the g flag to search/replace by default
set gdefault
" Use UTF-8 without BOM
set encoding=utf-8 nobomb
" Change mapleader
let mapleader=","
" Don’t add empty newlines at the end of files
set binary
set noeol
" Centralize backups, swapfiles and undo history
set backupdir=~/.vim/backups
set directory=~/.vim/swaps
if exists("&undodir")
	set undodir=~/.vim/undo
endif

" Enable line numbers
set number
" Enable syntax highlighting
syntax on
" Highlight current line
set cursorline
" Toggle line highlight (,l)
nnoremap <silent> <leader>l :set nocursorline!<CR>
" Make tabs as wide as two spaces
set tabstop=2
set shiftwidth=2
" Toggle show tabs and trailing spaces (,c)
set lcs=tab:›\ ,trail:·,eol:¬,nbsp:_
set fcs=fold:-
nnoremap <silent> <leader>c :set nolist!<CR>
" Highlight searches
set hlsearch
" Ignore case of searches
set ignorecase
" Highlight dynamically as pattern is typed
set incsearch
" Always show status line
set laststatus=2
" Enable mouse in all modes
set mouse=a
" Disable error bells
set noerrorbells
" Don’t reset cursor to start of line when moving around.
set nostartofline
" Show the cursor position
set ruler
" Don’t show the intro message when starting vim
set shortmess=atI
" Show the current mode
set showmode
" Show the filename in the window titlebar
set title
" Show the (partial) command as it’s being typed
set showcmd
" If we have relative line numbers...
if exists("&relativenumber")
  " Use them
	set relativenumber
	au BufReadPost * set relativenumber
  " Add a toggle for them (,n)
  function! Toggle_relative_line_numbers()
    if &relativenumber
      set number
      au! BufReadPost * set relativenumber
    else
      set relativenumber
      au BufReadPost * set relativenumber
    endif
  endfunction
  nnoremap <silent> <leader>n :call Toggle_relative_line_numbers()<CR>
endif
" Start scrolling three lines before the horizontal window border
set scrolloff=3

" Strip trailing whitespace (,ss)
function! StripWhitespace()
	let save_cursor = getpos(".")
	let old_query = getreg('/')
	:%s/\s\+$//e
	call setpos('.', save_cursor)
	call setreg('/', old_query)
endfunction
noremap <leader>ss :call StripWhitespace()<CR>
" Save a file as root (,W)
noremap <leader>W :w !sudo tee % > /dev/null<CR>

" Automatic commands
if has("autocmd")
	" Enable file type detection
	filetype on
	" Treat .json files as .js
	autocmd BufNewFile,BufRead *.json setfiletype json syntax=javascript
endif

" Auto-indentation on and toggle (,a)
nnoremap <silent> <leader>a :set noai!<CR>
set ai
" Expand tabs to spaces
set expandtab

" Split window nav·
" These maximize the targeted window:
"map <C-J> <C-W>j<C-W>_
"map <C-K> <C-W>k<C-W>_
map <C-J> <C-W>j
map <C-K> <C-W>k
map <C-H> <C-W>h
map <C-L> <C-W>l

" Faster split resizing (+,-)
if bufwinnr(1)
  map + <C-W>+
  map - <C-W>-
endif

" startup
autocmd VimEnter * NERDTree
autocmd VimEnter * wincmd p

" shutdown
autocmd WinEnter * call s:CloseIfOnlyNerdTreeLeft()

" Close all open buffers on entering a window if the only
" buffer that's left is the NERDTree buffer
function! s:CloseIfOnlyNerdTreeLeft()
  if exists("t:NERDTreeBufName")
    if bufwinnr(t:NERDTreeBufName) != -1
      if winnr("$") == 1
        q
      endif
    endif
  endif
endfunction

" start Pathogen
call pathogen#infect()

" Paste mode toggle (Ctrl-a)
nnoremap <c-a> :set invpaste paste?<CR>
set pastetoggle=<c-a>
set showmode

" Sudo write (,W)
noremap <leader>W :w !sudo tee %<CR>

" Remap :W to :w
command W w

" Hard to type things
" Cool but annoying (e.g. I type > more than →)
"imap >> →
"imap << ←
"imap ^^ ↑
"imap VV ↓
"imap aa λ

" Sources for MOAR!
" based on https://github.com/mathiasbynens/dotfiles/blob/master/.vimrc
" several commands stolen from:
"   https://github.com/gf3/dotfiles/blob/master/.vimrc
