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
    struct book* head, *tail;
};

void books_insert_after(struct books* books, struct book* book, struct book* new_book)
{
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

void books_insert_before(struct books* books, struct book* node, struct book* new_book)
{
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    new_book->next = node;
    if (node->prev == NULL) {        
        books->head = new_book;
    }
    else {
        new_book->prev = node->prev;
        node->prev->next = new_book;
    }
    node->prev = new_book;

}

void books_insert_beginning(struct books* books, struct book* new_book)
{
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    if (books->head == NULL)
    {
        books->head = new_book;
        books->tail = new_book;
    }
    else
    {
        new_book->next = books->head;
        books->head = new_book;
        books->head->prev = new_book;
    }
}

void insert_end(struct books* books, struct book* new_book)
{
    assert(new_book->prev == NULL);
    assert(new_book->next == NULL);

    if (books->tail == NULL)
    {
        books->head = new_book;
        books->tail = new_book;
    }
    else
    {
        new_book->prev = books->tail;
        books->tail = new_book;
        books->tail->next = new_book;
    }
}

void books_remove_and_free(struct books* books, struct book* node)
{
    if (node->prev == NULL)
        books->head = node->next;
    else
        node->prev->next = node->next;

    if (node->next == NULL)
        books->tail = node->prev;
    else
        node->next->prev = node->prev;

    free(node);
}


void books_destroy(struct books* books)
{
    //pre condition
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL)
    {
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
    struct books list = { 0 };
    struct book* b1 = NULL;
    struct book* b2 = NULL;
    try
    {
        b1 = calloc(1, sizeof(struct book));
        if (b1 == NULL) throw;
        insert_end(&list, b1 /*REF MOVED*/);

        b2 = calloc(1, sizeof(struct book));
        if (b2 == NULL) throw;
        insert_end(&list, b2 /*REF MOVED*/);
    }
    catch {
    }


    books_destroy(&list);
}
```

