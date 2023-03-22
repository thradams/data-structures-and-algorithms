[Main](README.md) > [Linked lists](linked_lists.md) > [Doubly Linked lists](doublelinkedlist.md) > Sample 1

```c

/*
 * Sample 1
 */

#include <stdlib.h>
#include <assert.h>


struct book {
    char title[10];
    struct book* next;
    struct book* prev;
};

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

void books_remove_and_free(struct books* books, struct book* book)
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

    free(book);
}


void books_destroy(struct books* books)
{
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL) {
        struct book* next = it->next;
        free(it);
        it = next;
    }
}

#define try if (1)
#define throw goto CATCH_BLOCK
#define catch else CATCH_BLOCK:

int main(int argc, char* argv[])
{
    struct books books = { 0 };

    try
    {
        struct book* book1 = calloc(1, sizeof(struct book));
        if (book1 == NULL) throw;
        books_push_back(&books, book1 /*SINK*/);

        struct book* book2 = calloc(1, sizeof(struct book));
        if (book2 == NULL) throw;
        books_push_back(&books, book2 /*SINK*/);
    }
    catch {
    }


    books_destroy(&books);
}

```

