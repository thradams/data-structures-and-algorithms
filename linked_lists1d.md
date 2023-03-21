[Main](README.md) > [Linked lists](linked_lists.md) > [Singly Linked lists](singlylinkedlist.md) > Sample 2

```c

/*
* Sample 2
*/

#include <stdlib.h>
#include <assert.h>


struct book {
    char* title;
    struct book* next;
};

void book_destroy(struct book* book) {
    free(book->title);
}

struct books {
    struct book* head, *tail;
};


void books_append(struct books* books, struct book* book)
{
    //pre condition
    assert(books != NULL);
    assert(book->next == NULL);

    if (books->head == NULL) {
        books->head = book;
        books->tail = book;
    }
    else {
        books->tail->next = book;
        books->tail = book;
    }
}

void books_destroy(struct books* books)
{
    //pre condition
    assert(books != NULL);

    struct book* it = books->head;
    while (it != NULL)
    {
        struct book* next = it->next;
        book_destroy(it);
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
    struct book* book = NULL;
    try
    {
        book = calloc(1, sizeof(struct book));
        if (book == NULL) throw;
        book->title = strdup("title 1");
        if (book->title == NULL) throw;
        books_append(&books, book/*MOVED*/);
        book = NULL; /*MOVED ON SUCCESS, NEVER FAILS*/
    }
    catch {
    }

    if (book != NULL) {
        //in case of error...
        book_destroy(book);
    }

    books_destroy(&books);
}
```

