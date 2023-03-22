```c
/*
 * Sample 2
 */

#include <stdlib.h>
#include <assert.h>


struct book {
    char* title;
    struct book* next;
    struct book* prev;
};

void book_delete(struct book* book) {
    if (book) { 
        free(book->title); 
        free(book);
    }
}

struct books {
    struct book* head, * tail;
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

struct book* books_remove(struct books* books, struct book* book)
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

    book->next = NULL;
    book->prev = NULL;
    return book;
}

void books_remove_and_delete(struct books* books, struct book* book)
{    
    book_delete(books_remove(books, book));
}


void books_destroy(struct books* books)
{
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL) {
        struct book* next = it->next;
        book_delete(it);
        it = next;
    }
}

#define try if (1)
#define throw goto CATCH_BLOCK
#define catch else CATCH_BLOCK:

int main(int argc, char* argv[])
{
    struct books books = { 0 };

    struct book* book1 = NULL;
    struct book* book2 = NULL;

    try
    {
        book1 = calloc(1, sizeof(struct book));
        if (book1 == NULL) throw;
        book1->title = strdup("book1");
        if (book1->title == NULL) throw;

        books_push_back(&books, book1 /*MOVED*/);
        book1 = NULL;/*MOVED*/

        book2 = calloc(1, sizeof(struct book));
        if (book2 == NULL) throw;
        
        book2->title = strdup("book2");
        if (book2->title == NULL) throw;
        books_push_back(&books, book2 /*MOVED*/);
        book2 = NULL;/*MOVED*/
    }
    catch {
    }

    book_delete(book1);
    book_delete(book2);

    books_destroy(&books);
}

```

