```c
#include <stdlib.h>
#include <assert.h>
#include <errno.h>

struct book {
     char* title;
     struct book* next;
     struct book* prev;
};

void book_destroy(struct book* book) {
     free(book->title);
 }
 

struct books {
    struct book* head, *tail;
};

void books_insert_after(struct books* books, struct book* book, struct book* new_book)
{
    assert(books != NULL);
    assert(book != NULL);
    assert(new_book != NULL);
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    new_book->prev = book;

    if (book->next == NULL) {
        books->tail = new_book;
    }
    else {
        new_book->next = book->next;
        book->next->prev = new_book;
    }

    book->next = new_book;
}

void books_insert_before(struct books* books, struct book* book, struct book* new_book)
{
    assert(books != NULL);
    assert(book != NULL);
    assert(new_book != NULL);
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    new_book->next = book;
    if (book->prev == NULL) {
        books->head = new_book;
    }
    else {
        new_book->prev = book->prev;
        book->prev->next = new_book;
    }
    book->prev = new_book;

}
void books_remove(struct books* books, struct book* book)
{
    assert(books != NULL);
    assert(book != NULL);

    if (book->prev == NULL)
        books->head = book->next;
    else
        book->prev->next = book->next;

    if (book->next == NULL)
        books->tail = book->prev;
    else
        book->next->prev = book->prev;
    
    book_destroy(book);
    free(book);
}


void books_push_back(struct books* books, struct book* new_book)
{
    assert(books != NULL);
    assert(new_book != NULL);
      assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    if (books->tail == NULL) {
        books->head = new_book;
         books->tail = new_book;
    }
    else {
         new_book->prev = books->tail;        
        books->tail->next = new_book;
         books->tail = new_book;
    }
}

void books_push_front(struct books* books, struct book* new_book)
{
    assert(books != NULL);
    assert(new_book != NULL);
     assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    if (books->head == NULL) {
        books->head = new_book;
        books->tail = new_book;
    }
    else {
        new_book->next = books->head;        
        books->head->prev = new_book;
        books->head = new_book;
    }
}

void books_destroy(struct books* books)
{
    //pre condition
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL) {
        struct book* next = it->next;
        book_destroy(it);
        free(it);
        it = next;
    }
}

int main(int argc, char* argv[])
{
    struct books list = { 0 };
    struct book* b1 = calloc(1, sizeof(struct book));
    if (b1)
    {
        books_push_front(&list, b1);
    }
    books_destroy(&list);
}

```
