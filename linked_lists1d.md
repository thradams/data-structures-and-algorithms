```c
#include <stdlib.h>
#include <assert.h>


struct book {
    char *title;
    struct book* next;
};

void book_destroy(struct book* book) 
{
    free(book->title);
}

struct books {
    struct book* head, *tail;
};


void books_append(struct books* list, struct book* book)
{
    //pre condition
    assert(book->next == NULL);

    if (list->head == NULL) {
        list->head = book;
        list->tail = book;
    }
    else {
        list->tail->next = book;
        list->tail = book;
    }
}

void books_destroy(struct books* list)
{
    struct book* it = list->head;
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
        book = calloc(1, sizeof (struct book));
        if (book == NULL) throw;
        book->title = strdup("title 1");
        if (book->title == NULL) throw;
        books_append(&books, book/*MOVED*/);
        book = NULL; /*MOVED ON SUCCESS*/        
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

